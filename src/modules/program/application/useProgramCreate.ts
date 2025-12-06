'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { programApi } from '../infrastructure/program.api';
import { ProgramRequest } from "../domain/program.types";
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * POST /api/v1/programs
 */
export const useProgramCreate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createProgram = async (payload: ProgramRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await programApi.create(payload);
            router.push('/programs');
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createProgram,
        isLoading,
        error,
    };
};

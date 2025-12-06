'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { programApi } from '../infrastructure/program.api';
import { ProgramRequest } from '../domain/program.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * PUT /api/v1/programs/{id}
 */
export const useProgramUpdate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProgram = async (id: string, payload: ProgramRequest) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            await programApi.update(id, payload);
            router.push('/program');
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateProgram,
        isLoading,
        error,
    };
};

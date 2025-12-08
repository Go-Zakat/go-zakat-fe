'use client';

import { useState, useCallback } from 'react';
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

    // Bungkus useCallback + throw err
    const createProgram = useCallback(async (payload: ProgramRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await programApi.create(payload);
            router.push('/program');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err; // Lempar error ke controller
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        createProgram,
        isLoading,
        error,
    };
};
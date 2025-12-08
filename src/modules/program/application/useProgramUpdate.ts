'use client';

import { useState, useCallback } from 'react';
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

    // Bungkus useCallback + throw err
    const updateProgram = useCallback(async (id: string, payload: ProgramRequest) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            await programApi.update(id, payload);
            router.push('/program');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err; // Lempar error ke controller
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        updateProgram,
        isLoading,
        error,
    };
};
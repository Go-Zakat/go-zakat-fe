'use client';

import { useState, useCallback } from 'react';
import { programApi } from '../infrastructure/program.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * DELETE /api/v1/programs/{id}
 */
export const useProgramDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Bungkus dengan useCallback + return boolean
    const deleteProgram = useCallback(async (id: string): Promise<boolean> => {
        if (!id) return false;

        setIsLoading(true);
        setError(null);

        try {
            await programApi.delete(id);
            return true;
        } catch (err) {
            setError(extractErrorMessage(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        deleteProgram,
        isLoading,
        error,
    };
};
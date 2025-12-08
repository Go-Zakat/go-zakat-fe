'use client';

import { useState, useCallback } from 'react';
import { muzakkiApi } from '../infrastructure/muzakki.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * DELETE /api/v1/muzakki/{id}
 */
export const useMuzakkiDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Bungkus dengan useCallback
    const deleteMuzakki = useCallback(async (id: string): Promise<boolean> => {
        if (!id) return false;

        setIsLoading(true);
        setError(null);

        try {
            await muzakkiApi.delete(id);
            return true;
        } catch (err) {
            setError(extractErrorMessage(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        deleteMuzakki,
        isLoading,
        error,
    };
};
'use client';

import { useState, useCallback } from 'react';
import { asnafApi } from '../infrastructure/asnaf.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * DELETE /api/v1/asnaf/{id}
 */
export const useAsnafDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteAsnaf = useCallback(async (id: string): Promise<boolean> => {
        if (!id) return false;

        setIsLoading(true);
        setError(null);

        try {
            await asnafApi.delete(id);
            return true;
        } catch (err) {
            setError(extractErrorMessage(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const resetError = useCallback(() => {
        setError(null);
    }, []);

    return {
        deleteAsnaf,
        isLoading,
        error,
        resetError
    };
};
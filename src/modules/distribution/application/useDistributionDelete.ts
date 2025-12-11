'use client';

import { useState, useCallback } from 'react';
import { distributionApi } from '../infrastructure/distribution.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * DELETE /api/v1/distributions/{id}
 */
export const useDistributionDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteDistribution = useCallback(async (id: string): Promise<boolean> => {
        if (!id) return false;

        setIsLoading(true);
        setError(null);

        try {
            await distributionApi.delete(id);
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
        deleteDistribution,
        isLoading,
        error,
        resetError
    };
};
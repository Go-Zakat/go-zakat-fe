'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { distributionApi } from '../infrastructure/distribution.api';
import { DistributionRequest } from '../domain/distribution.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * PUT /api/v1/distributions/{id}
 */
export const useDistributionUpdate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateDistribution = useCallback(async (id: string, payload: DistributionRequest) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            await distributionApi.update(id, payload);
            router.push('/distribution');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        updateDistribution,
        isLoading,
        error,
    };
};
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { distributionApi } from '../infrastructure/distribution.api';
import { DistributionRequest } from '../domain/distribution.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * POST /api/v1/distributions
 */
export const useDistributionCreate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createDistribution = useCallback(async (payload: DistributionRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await distributionApi.create(payload);
            router.push('/distribution');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        createDistribution,
        isLoading,
        error,
    };
};
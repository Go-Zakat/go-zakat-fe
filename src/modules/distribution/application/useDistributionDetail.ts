'use client';

import { useState, useCallback } from 'react';
import { distributionApi } from '../infrastructure/distribution.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Distribution } from '@/src/shared/types/common.types';

/**
 * GET /api/v1/distributions/{id}
 */
export const useDistributionDetail = () => {
    const [data, setData] = useState<Distribution | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getDistributionById = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await distributionApi.getById(id);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getDistributionById,
        data,
        isLoading,
        error,
    };
};
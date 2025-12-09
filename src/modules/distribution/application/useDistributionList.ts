'use client';

import { useState, useCallback } from 'react';
import { distributionApi, GetDistributionListParams } from '../infrastructure/distribution.api';
import { PaginatedData } from '@/src/shared/types/pagination.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Distribution } from '@/src/shared/types/common.types';

/**
 * GET /api/v1/distributions
 */
export const useDistributionList = () => {
    const [data, setData] = useState<PaginatedData<Distribution> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getDistributionList = useCallback(async (params?: GetDistributionListParams) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await distributionApi.getList(params);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getDistributionList,
        data,
        items: data?.items ?? [],
        meta: data?.meta,
        isLoading,
        error,
    };
};
'use client';

import { useState, useCallback } from 'react';
import { reportApi } from '../infrastructure/report.api';
import { GetDistributionSummaryParams } from '../domain/report.types';
import { DistributionSummaryItem } from '@/src/shared/types/common.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

export const useDistributionSummary = () => {
    const [data, setData] = useState<DistributionSummaryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getDistributionSummary = useCallback(async (params?: GetDistributionSummaryParams) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await reportApi.getDistributionSummary(params);
            setData(response.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getDistributionSummary,
        data,
        isLoading,
        error
    };
};
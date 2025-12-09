'use client';

import { useState, useCallback } from 'react';
import { reportsApi } from '../infrastructure/reports.api';
import { GetIncomeSummaryParams } from '../domain/reports.types';
import { IncomeSummaryItem } from '@/src/shared/types/common.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

export const useIncomeSummary = () => {
    const [data, setData] = useState<IncomeSummaryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getIncomeSummary = useCallback(async (params?: GetIncomeSummaryParams) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await reportsApi.getIncomeSummary(params);
            setData(response.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getIncomeSummary,
        data,
        isLoading,
        error
    };
};
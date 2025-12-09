'use client';

import { useState, useCallback } from 'react';
import { reportsApi } from '../infrastructure/reports.api';
import { GetFundBalanceParams } from '../domain/reports.types';
import { FundBalance } from '@/src/shared/types/common.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

export const useFundBalance = () => {
    const [data, setData] = useState<FundBalance[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getFundBalance = useCallback(async (params?: GetFundBalanceParams) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await reportsApi.getFundBalance(params);
            setData(response.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getFundBalance,
        data,
        isLoading,
        error
    };
};
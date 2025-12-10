'use client';

import { useState, useCallback } from 'react';
import { reportApi } from '../infrastructure/report.api';
import { GetFundBalanceParams } from '../domain/report.types';
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
            const response = await reportApi.getFundBalance(params);
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
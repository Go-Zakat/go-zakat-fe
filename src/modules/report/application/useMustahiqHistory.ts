'use client';

import { useState, useCallback } from 'react';
import { reportsApi } from '../infrastructure/reports.api';
import { MustahiqHistoryReport } from '@/src/shared/types/common.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

export const useMustahiqHistory = () => {
    const [data, setData] = useState<MustahiqHistoryReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getMustahiqHistory = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await reportsApi.getMustahiqHistory(id);
            setData(response.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getMustahiqHistory,
        data,
        isLoading,
        error
    };
};
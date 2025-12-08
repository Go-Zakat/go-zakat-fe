'use client';

import { useState, useCallback } from 'react';
import { muzakkiApi, GetMuzakkiListParams } from '../infrastructure/muzakki.api';
import { PaginatedData } from '@/src/shared/types/pagination.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Muzakki } from "@/src/shared/types/common.types";

/**
 * GET /api/v1/muzakki
 */
export const useMuzakkiList = () => {
    const [data, setData] = useState<PaginatedData<Muzakki> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Bungkus dengan useCallback
    const getMuzakkiList = useCallback(async (params?: GetMuzakkiListParams) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await muzakkiApi.getList(params);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getMuzakkiList,
        data,
        items: data?.items ?? [],
        meta: data?.meta,
        isLoading,
        error,
    };
};
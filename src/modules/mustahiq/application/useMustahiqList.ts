'use client';

import { useState } from 'react';
import { mustahiqApi, GetMustahiqListParams } from '../infrastructure/mustahiq.api';
import { PaginatedData } from '@/src/shared/types/pagination.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Mustahiq } from "@/src/shared/types/common.types";

/**
 * GET /api/v1/mustahiq
 */
export const useMustahiqList = () => {
    const [data, setData] = useState<PaginatedData<Mustahiq> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getMustahiqList = async (params?: GetMustahiqListParams) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await mustahiqApi.getList(params);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getMustahiqList,
        data,
        items: data?.items ?? [],
        meta: data?.meta,
        isLoading,
        error,
    };
};

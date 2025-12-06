'use client';

import { useState } from 'react';
import { asnafApi, GetAsnafListParams } from '../infrastructure/asnaf.api';
import { PaginatedData } from '@/src/shared/types/pagination.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Asnaf } from "@/src/shared/types/common.types";

/**
 * GET /api/v1/asnaf
 */
export const useAsnafList = () => {
    const [data, setData] = useState<PaginatedData<Asnaf> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAsnafList = async (params?: GetAsnafListParams) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await asnafApi.getList(params);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getAsnafList,
        data,
        items: data?.items ?? [],
        meta: data?.meta,
        isLoading,
        error,
    };
};

'use client';

import { useState } from 'react';
import { asnafApi, GetAsnafListParams } from '../infrastructure/asnaf.api';
import { AsnafListData } from '../domain/asnaf.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * GET /api/v1/asnaf
 */
export const useAsnafList = () => {
    const [data, setData] = useState<AsnafListData | null>(null);
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

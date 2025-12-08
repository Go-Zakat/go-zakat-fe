'use client';

import { useState, useCallback } from 'react';
import { asnafApi } from '../infrastructure/asnaf.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Asnaf } from "@/src/shared/types/common.types";

/**
 * GET /api/v1/asnaf/{id}
 */
export const useAsnafDetail = () => {
    const [data, setData] = useState<Asnaf | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAsnafById = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await asnafApi.getById(id);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getAsnafById,
        data,
        isLoading,
        error,
    };
};
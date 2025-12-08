'use client';

import { useState, useCallback } from 'react';
import { mustahiqApi } from '../infrastructure/mustahiq.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Mustahiq } from "@/src/shared/types/common.types";

/**
 * GET /api/v1/mustahiq/{id}
 */
export const useMustahiqDetail = () => {
    const [data, setData] = useState<Mustahiq | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getMustahiqById = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await mustahiqApi.getById(id);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getMustahiqById,
        data,
        isLoading,
        error,
    };
};
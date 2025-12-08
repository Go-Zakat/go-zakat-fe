'use client';

import { useState, useCallback } from 'react';
import { muzakkiApi } from '../infrastructure/muzakki.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Muzakki } from "@/src/shared/types/common.types";

/**
 * GET /api/v1/muzakki/{id}
 */
export const useMuzakkiDetail = () => {
    const [data, setData] = useState<Muzakki | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Bungkus dengan useCallback
    const getMuzakkiById = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await muzakkiApi.getById(id);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getMuzakkiById,
        data,
        isLoading,
        error,
    };
};
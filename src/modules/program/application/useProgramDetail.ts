'use client';

import { useState, useCallback } from 'react';
import { programApi } from '../infrastructure/program.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Program } from "@/src/shared/types/common.types";

/**
 * GET /api/v1/programs/{id}
 */
export const useProgramDetail = () => {
    const [data, setData] = useState<Program | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Bungkus dengan useCallback
    const getProgramById = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await programApi.getById(id);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getProgramById,
        data,
        isLoading,
        error,
    };
};
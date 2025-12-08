'use client';

import { useState, useCallback } from 'react';
import { programApi, GetProgramListParams } from '../infrastructure/program.api';
import { PaginatedData } from '@/src/shared/types/pagination.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { Program } from "@/src/shared/types/common.types";

/**
 * GET /api/v1/programs
 */
export const useProgramList = () => {
    const [data, setData] = useState<PaginatedData<Program> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Bungkus dengan useCallback
    const getProgramList = useCallback(async (params?: GetProgramListParams) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await programApi.getList(params);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getProgramList,
        data,
        items: data?.items ?? [],
        meta: data?.meta,
        isLoading,
        error,
    };
};
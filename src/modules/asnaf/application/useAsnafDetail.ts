'use client';

import { useState } from 'react';
import { asnafApi } from '../infrastructure/asnaf.api';
import { Asnaf } from '../domain/asnaf.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * GET /api/v1/asnaf/{id}
 */
export const useAsnafDetail = () => {
    const [data, setData] = useState<Asnaf | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAsnafById = async (id: string) => {
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
    };

    return {
        getAsnafById,
        data,
        isLoading,
        error,
    };
};

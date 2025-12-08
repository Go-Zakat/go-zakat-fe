'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { mustahiqApi } from '../infrastructure/mustahiq.api';
import { MustahiqRequest } from '../domain/mustahiq.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * PUT /api/v1/mustahiq/{id}
 */
export const useMustahiqUpdate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateMustahiq = useCallback(async (id: string, payload: MustahiqRequest) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            await mustahiqApi.update(id, payload);
            router.push('/mustahiq');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        updateMustahiq,
        isLoading,
        error,
    };
};
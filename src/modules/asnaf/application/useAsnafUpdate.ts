'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { asnafApi } from '../infrastructure/asnaf.api';
import { AsnafRequest } from '../domain/asnaf.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * PUT /api/v1/asnaf/{id}
 */
export const useAsnafUpdate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateAsnaf = useCallback(async (id: string, payload: AsnafRequest) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            await asnafApi.update(id, payload);
            router.push('/asnaf');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        updateAsnaf,
        isLoading,
        error,
    };
};
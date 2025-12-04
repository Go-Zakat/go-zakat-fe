'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { asnafApi } from '../infrastructure/asnaf.api';
import { UpdateAsnafRequest } from '../domain/asnaf.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * PUT /api/v1/asnaf/{id}
 */
export const useAsnafUpdate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateAsnaf = async (id: string, payload: UpdateAsnafRequest) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            await asnafApi.update(id, payload);
            router.push('/asnaf');
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateAsnaf,
        isLoading,
        error,
    };
};

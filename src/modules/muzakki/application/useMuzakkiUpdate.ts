'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { muzakkiApi } from '../infrastructure/muzakki.api';
import { MuzakkiRequest } from '../domain/muzakki.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * PUT /api/v1/muzakki/{id}
 */
export const useMuzakkiUpdate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateMuzakki = async (id: string, payload: MuzakkiRequest) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            await muzakkiApi.update(id, payload);
            router.push('/muzakki');
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateMuzakki,
        isLoading,
        error,
    };
};

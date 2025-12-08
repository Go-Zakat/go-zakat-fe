'use client';

import { useState, useCallback } from 'react';
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

    // Bungkus useCallback + throw err
    const updateMuzakki = useCallback(async (id: string, payload: MuzakkiRequest) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            await muzakkiApi.update(id, payload);
            router.push('/muzakki');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err; // Lempar error ke controller
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        updateMuzakki,
        isLoading,
        error,
    };
};
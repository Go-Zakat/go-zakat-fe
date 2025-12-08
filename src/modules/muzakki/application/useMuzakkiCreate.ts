'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { muzakkiApi } from '../infrastructure/muzakki.api';
import { MuzakkiRequest } from '../domain/muzakki.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * POST /api/v1/muzakki
 */
export const useMuzakkiCreate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Bungkus useCallback + throw err
    const createMuzakki = useCallback(async (payload: MuzakkiRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await muzakkiApi.create(payload);
            router.push('/muzakki');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err; // Lempar error ke controller
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        createMuzakki,
        isLoading,
        error,
    };
};
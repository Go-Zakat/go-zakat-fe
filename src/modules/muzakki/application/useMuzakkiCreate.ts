'use client';

import { useState } from 'react';
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

    const createMuzakki = async (payload: MuzakkiRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await muzakkiApi.create(payload);
            router.push('/muzakki');
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createMuzakki,
        isLoading,
        error,
    };
};

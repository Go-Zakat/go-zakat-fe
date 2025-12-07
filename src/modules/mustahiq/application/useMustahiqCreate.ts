'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mustahiqApi } from '../infrastructure/mustahiq.api';
import { MustahiqRequest } from "../domain/mustahiq.types";
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * POST /api/v1/mustahiq
 */
export const useMustahiqCreate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createMustahiq = async (payload: MustahiqRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await mustahiqApi.create(payload);
            router.push('/mustahiq');
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createMustahiq,
        isLoading,
        error,
    };
};

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { asnafApi } from '../infrastructure/asnaf.api';
import { AsnafRequest } from "..//domain/asnaf.types";
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * POST /api/v1/asnaf
 */
export const useAsnafCreate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createAsnaf = async (payload: AsnafRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await asnafApi.create(payload);
            router.push('/asnaf');
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createAsnaf,
        isLoading,
        error,
    };
};

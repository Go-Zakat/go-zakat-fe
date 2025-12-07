'use client';

import { useState } from 'react';
import { mustahiqApi } from '../infrastructure/mustahiq.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * DELETE /api/v1/mustahiq/{id}
 */
export const useMustahiqDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteMustahiq = async (id: string): Promise<boolean> => {
        if (!id) return false;

        setIsLoading(true);
        setError(null);

        try {
            await mustahiqApi.delete(id);
            return true;
        } catch (err) {
            setError(extractErrorMessage(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteMustahiq,
        isLoading,
        error,
    };
};

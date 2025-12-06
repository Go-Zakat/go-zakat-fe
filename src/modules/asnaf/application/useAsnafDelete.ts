'use client';

import { useState } from 'react';
import { asnafApi } from '../infrastructure/asnaf.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * DELETE /api/v1/asnaf/{id}
 */
export const useAsnafDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteAsnaf = async (id: string): Promise<boolean> => {
        if (!id) return false;

        setIsLoading(true);
        setError(null);

        try {
            await asnafApi.delete(id);
            return true;
        } catch (err) {
            setError(extractErrorMessage(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteAsnaf,
        isLoading,
        error,
    };
};

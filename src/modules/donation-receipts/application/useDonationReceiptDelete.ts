'use client';

import { useState, useCallback } from 'react';
import { donationReceiptsApi } from '../infrastructure/donationReceipts.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * DELETE /api/v1/donation-receipts/{id}
 */
export const useDonationReceiptDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteDonationReceipt = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            await donationReceiptsApi.delete(id);
            return true;
        } catch (err) {
            setError(extractErrorMessage(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        deleteDonationReceipt,
        isLoading,
        error,
    };
};
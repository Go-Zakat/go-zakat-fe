'use client';

import { useState, useCallback } from 'react';
import { donationReceiptsApi } from '../infrastructure/donationReceipts.api';
import { DonationReceipt } from '@/src/shared/types/common.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * GET /api/v1/donation-receipts/{id}
 */
export const useDonationReceiptDetail = () => {
    const [data, setData] = useState<DonationReceipt | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getDonationReceiptById = useCallback(async (id: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await donationReceiptsApi.getById(id);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getDonationReceiptById,
        data,
        isLoading,
        error,
    };
};
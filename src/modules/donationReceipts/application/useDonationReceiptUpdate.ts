'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { donationReceiptsApi } from '../infrastructure/donationReceipts.api';
import { DonationReceiptRequest } from '../domain/donationReceipts.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * PUT /api/v1/donation-receipts/{id}
 */
export const useDonationReceiptUpdate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateDonationReceipt = async (id: string, payload: DonationReceiptRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await donationReceiptsApi.update(id, payload);
            router.push('/donation-receipts');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        updateDonationReceipt,
        isLoading,
        error,
    };
};

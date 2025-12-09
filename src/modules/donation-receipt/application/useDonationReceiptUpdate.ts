'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { donationReceiptApi } from '../infrastructure/donationReceipt.api';
import { DonationReceiptRequest } from '../domain/donationReceipt.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * PUT /api/v1/donation-receipts/{id}
 */
export const useDonationReceiptUpdate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateDonationReceipt = useCallback(async (id: string, payload: DonationReceiptRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await donationReceiptApi.update(id, payload);
            router.push('/donation-receipt');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        updateDonationReceipt,
        isLoading,
        error,
    };
};
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { donationReceiptsApi } from '../infrastructure/donationReceipts.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { DonationReceiptRequest } from "@/src/modules/donationReceipts/domain/donationReceipts.types";

/**
 * POST /api/v1/donation-receipts
 */
export const useDonationReceiptCreate = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createDonationReceipt = useCallback(async (payload: DonationReceiptRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await donationReceiptsApi.create(payload);
            router.push('/donation-receipts');
        } catch (err) {
            setError(extractErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    return {
        createDonationReceipt,
        isLoading,
        error,
    };
};
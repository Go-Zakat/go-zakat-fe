'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { donationReceiptApi } from '../infrastructure/donationReceipt.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { DonationReceiptRequest } from "@/src/modules/donation-receipt/domain/donationReceipt.types";

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
            await donationReceiptApi.create(payload);
            router.push('/donation-receipt');
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
'use client';

import { useState } from 'react';
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

    const createDonationReceipt = async (payload: DonationReceiptRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await donationReceiptsApi.create(payload);
            router.push('/donation-receipts');
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createDonationReceipt,
        isLoading,
        error,
    };
};

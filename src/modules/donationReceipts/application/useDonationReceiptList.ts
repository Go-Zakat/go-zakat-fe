'use client';

import { useState } from 'react';
import { donationReceiptsApi, GetDonationReceiptListParams } from '../infrastructure/donationReceipts.api';
import { PaginatedData } from '@/src/shared/types/pagination.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { DonationReceipt } from '@/src/shared/types/common.types';

/**
 * GET /api/v1/donation-receipts
 */
export const useDonationReceiptList = () => {
    const [data, setData] = useState<PaginatedData<DonationReceipt> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getDonationReceiptList = async (params?: GetDonationReceiptListParams) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await donationReceiptsApi.getList({
                ...params,
                date_from: params?.date_from,
                date_to: params?.date_to,
            });
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getDonationReceiptList,
        data,
        items: data?.items ?? [],
        meta: data?.meta,
        isLoading,
        error,
    };
};

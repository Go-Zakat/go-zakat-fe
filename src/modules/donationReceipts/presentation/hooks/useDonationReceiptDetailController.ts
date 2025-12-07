'use client';

import { useEffect } from 'react';
import { useDonationReceiptDetail } from '../../application/useDonationReceiptDetail';

export const useDonationReceiptDetailController = (id: string) => {
    // Hook Detail
    const { getDonationReceiptById, data: donationReceipt, isLoading, error } = useDonationReceiptDetail();

    useEffect(() => {
        if (id) {
            getDonationReceiptById(id);
        }
    }, [id]);

    return {
        donationReceipt,
        isLoading,
        error
    };
};

'use client';

import { useEffect } from 'react';
import { useDonationReceiptDetail } from '../../application/useDonationReceiptDetail';

export const useDonationReceiptDetailController = (id: string) => {
    const { getDonationReceiptById, data: donationReceipt, isLoading, error } = useDonationReceiptDetail();

    useEffect(() => {
        if (id) {
            void getDonationReceiptById(id);
        }
    }, [id, getDonationReceiptById]);

    return {
        donationReceipt,
        isLoading,
        error
    };
};
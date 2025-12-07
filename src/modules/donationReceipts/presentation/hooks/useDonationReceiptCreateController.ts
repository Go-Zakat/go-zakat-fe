'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationReceiptSchema, DonationReceiptFormValues } from '../../domain/donationReceipts.types';
import { useDonationReceiptCreate } from '../../application/useDonationReceiptCreate';
import { useMuzakkiList } from '@/src/modules/muzakki/application/useMuzakkiList';

export const useDonationReceiptCreateController = () => {
    const { createDonationReceipt, isLoading, error } = useDonationReceiptCreate();

    // Fetch Muzakki List untuk Dropdown
    const { getMuzakkiList, items: muzakkiList, isLoading: isMuzakkiLoading } = useMuzakkiList();

    useEffect(() => {
        getMuzakkiList({ per_page: 100 });
    }, []);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<DonationReceiptFormValues>({
        resolver: zodResolver(donationReceiptSchema),
        defaultValues: {
            receipt_number: `RCPT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
            receipt_date: new Date().toISOString().split('T')[0],
            items: [
                {
                    amount: 0,
                    fund_type: 'zakat', // Default to zakat
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const onSubmit = (data: DonationReceiptFormValues) => {
        createDonationReceipt(data as any);
    };

    return {
        register,
        control,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        muzakkiList,
        isMuzakkiLoading,
        fields,
        append,
        remove,
        watch,
        setValue
    };
};

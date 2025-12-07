'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationReceiptSchema, DonationReceiptFormValues } from '../../domain/donationReceipts.types';
import { useDonationReceiptUpdate } from '../../application/useDonationReceiptUpdate';
import { useDonationReceiptDetail } from '../../application/useDonationReceiptDetail';
import { useMuzakkiList } from '@/src/modules/muzakki/application/useMuzakkiList';

export const useDonationReceiptUpdateController = (id: string) => {
    const { updateDonationReceipt, isLoading: isUpdating, error: updateError } = useDonationReceiptUpdate();
    const { getDonationReceiptById, data: donationReceipt, isLoading: isFetching, error: fetchError } = useDonationReceiptDetail();

    // Fetch Muzakki List
    const { getMuzakkiList, items: muzakkiList, isLoading: isMuzakkiLoading } = useMuzakkiList();

    useEffect(() => {
        getMuzakkiList({ per_page: 100 });
        if (id) {
            getDonationReceiptById(id);
        }
    }, [id]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm<DonationReceiptFormValues>({
        resolver: zodResolver(donationReceiptSchema),
        defaultValues: {
            items: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    // Populate form with existing data
    useEffect(() => {
        if (donationReceipt) {
            reset({
                receipt_number: donationReceipt.receipt_number,
                receipt_date: donationReceipt.receipt_date ? new Date(donationReceipt.receipt_date).toISOString().split('T')[0] : '',
                payment_method: donationReceipt.payment_method as any,
                muzakki_id: donationReceipt.muzakki_id || donationReceipt.muzakki?.id || '',
                notes: donationReceipt.notes || '',
                items: donationReceipt.items?.map(item => ({
                    amount: item.amount,
                    fund_type: item.fund_type as any,
                    zakat_type: item.zakat_type as any,
                    person_count: item.person_count || undefined,
                    rice_kg: item.rice_kg || undefined,
                    notes: item.notes || ''
                })) || []
            });
        }
    }, [donationReceipt, reset]);

    const onSubmit = (data: DonationReceiptFormValues) => {
        updateDonationReceipt(id, data as any);
    };

    return {
        register,
        control,
        handleSubmit,
        errors,
        isLoading: isUpdating || isFetching,
        error: updateError || fetchError,
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

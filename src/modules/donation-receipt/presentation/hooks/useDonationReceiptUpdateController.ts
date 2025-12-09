'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationReceiptSchema, DonationReceiptFormValues, DonationReceiptRequest } from '../../domain/donationReceipt.types';
import { useDonationReceiptUpdate } from '../../application/useDonationReceiptUpdate';
import { useDonationReceiptDetail } from '../../application/useDonationReceiptDetail';
import { useMuzakkiList } from '@/src/modules/muzakki/application/useMuzakkiList';

export const useDonationReceiptUpdateController = (id: string) => {
    const { updateDonationReceipt, isLoading: isUpdating, error: updateError } = useDonationReceiptUpdate();
    const { getDonationReceiptById, data: donationReceipt, isLoading: isFetching, error: fetchError } = useDonationReceiptDetail();

    const { getMuzakkiList, items: muzakkiList, isLoading: isMuzakkiLoading } = useMuzakkiList();

    useEffect(() => {
        void getMuzakkiList({ per_page: 100 });
        if (id) {
            void getDonationReceiptById(id);
        }
    }, [id, getMuzakkiList, getDonationReceiptById]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm<DonationReceiptFormValues>({
        resolver: zodResolver(donationReceiptSchema) as unknown as Resolver<DonationReceiptFormValues>,
        defaultValues: {
            items: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    useEffect(() => {
        if (donationReceipt) {
            reset({
                receipt_number: donationReceipt.receipt_number,
                receipt_date: donationReceipt.receipt_date ? new Date(donationReceipt.receipt_date).toISOString().split('T')[0] : '',
                payment_method: donationReceipt.payment_method as DonationReceiptFormValues['payment_method'],
                muzakki_id: donationReceipt.muzakki_id || donationReceipt.muzakki?.id || '',
                notes: donationReceipt.notes || '',
                items: donationReceipt.items?.map(item => ({
                    amount: item.amount,
                    fund_type: item.fund_type as DonationReceiptFormValues['items'][number]['fund_type'],
                    zakat_type: item.zakat_type as DonationReceiptFormValues['items'][number]['zakat_type'],
                    person_count: item.person_count || undefined,
                    rice_kg: item.rice_kg || undefined,
                    notes: item.notes || ''
                })) || []
            });
        }
    }, [donationReceipt, reset]);

    const onSubmit = (data: DonationReceiptFormValues) => {
        const requestData = data as unknown as DonationReceiptRequest;

        updateDonationReceipt(id, requestData)
            .catch((err: unknown) => {
                console.error("Gagal update:", err);
            });
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
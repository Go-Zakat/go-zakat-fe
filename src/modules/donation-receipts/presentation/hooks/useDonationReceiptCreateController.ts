'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationReceiptSchema, DonationReceiptFormValues } from '../../domain/donationReceipts.types';
import { useDonationReceiptCreate } from '../../application/useDonationReceiptCreate';
import { useMuzakkiList } from '@/src/modules/muzakki/application/useMuzakkiList';
import { DonationReceiptRequest } from '../../domain/donationReceipts.types';

export const useDonationReceiptCreateController = () => {
    const { createDonationReceipt, isLoading, error } = useDonationReceiptCreate();

    const { getMuzakkiList, items: muzakkiList, isLoading: isMuzakkiLoading } = useMuzakkiList();

    useEffect(() => {
        void getMuzakkiList({ per_page: 100 });
    }, [getMuzakkiList]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<DonationReceiptFormValues>({
        resolver: zodResolver(donationReceiptSchema) as unknown as Resolver<DonationReceiptFormValues>,
        defaultValues: {
            receipt_number: '',
            receipt_date: '',
            muzakki_id: '',
            payment_method: 'cash',
            items: [
                {
                    amount: 0,
                    fund_type: 'zakat',
                }
            ]
        }
    });

    useEffect(() => {
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(4, '0');

        setValue('receipt_number', `RCPT-${dateStr}-${randomNum}`);
        setValue('receipt_date', new Date().toISOString().split('T')[0]);
    }, [setValue]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const onSubmit: SubmitHandler<DonationReceiptFormValues> = (data) => {
        const requestData = data as unknown as DonationReceiptRequest;

        createDonationReceipt(requestData)
            .catch((err: unknown) => {
                console.error("Gagal membuat kwitansi:", err);
            });
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
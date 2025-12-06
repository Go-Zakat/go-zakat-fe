'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { muzakkiSchema, MuzakkiFormValues } from '../../domain/muzakki.types';
import { useMuzakkiUpdate } from '../../application/useMuzakkiUpdate';
import { useMuzakkiDetail } from '../../application/useMuzakkiDetail';

export const useMuzakkiUpdateController = (id: string) => {
    const router = useRouter();
    const { updateMuzakki, isLoading: isUpdating, error: updateError } = useMuzakkiUpdate();
    const { data: muzakki, isLoading: isLoadingDetail, error: detailError, getMuzakkiById } = useMuzakkiDetail();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MuzakkiFormValues>({
        resolver: zodResolver(muzakkiSchema),
    });

    useEffect(() => {
        if (id) {
            getMuzakkiById(id);
        }
    }, [id]);

    useEffect(() => {
        if (muzakki) {
            reset({
                name: muzakki.name,
                address: muzakki.address || '',
                phoneNumber: muzakki.phoneNumber || '',
                notes: muzakki.notes || '',
            });
        }
    }, [muzakki, reset]);

    const onSubmit = async (data: MuzakkiFormValues) => {
        try {
            await updateMuzakki(id, data);
            router.push('/muzakki');
        } catch (error) {
            console.error('Failed to update muzakki:', error);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading: isUpdating || isLoadingDetail,
        error: updateError || detailError,
        onSubmit,
        muzakki,
    };
};

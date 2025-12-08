'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { muzakkiSchema, MuzakkiFormValues, MuzakkiRequest } from '../../domain/muzakki.types';
import { useMuzakkiUpdate } from '../../application/useMuzakkiUpdate';
import { useMuzakkiDetail } from '../../application/useMuzakkiDetail';

export const useMuzakkiUpdateController = (id: string) => {
    const { updateMuzakki, isLoading: isUpdating, error: updateError } = useMuzakkiUpdate();
    const { data: muzakki, isLoading: isLoadingDetail, error: detailError, getMuzakkiById } = useMuzakkiDetail();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MuzakkiFormValues>({
        // Casting Resolver
        resolver: zodResolver(muzakkiSchema) as unknown as Resolver<MuzakkiFormValues>,
    });

    useEffect(() => {
        if (id) {
            // Void & Dependency
            void getMuzakkiById(id);
        }
    }, [id, getMuzakkiById]);

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

    const onSubmit: SubmitHandler<MuzakkiFormValues> = (data) => {
        const requestData = data as unknown as MuzakkiRequest;

        // Handle Promise catch
        updateMuzakki(id, requestData)
            .catch((err: unknown) => {
                console.error("Gagal update muzakki:", err);
            });
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
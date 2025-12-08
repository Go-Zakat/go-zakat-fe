'use client';

import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { muzakkiSchema, MuzakkiFormValues, MuzakkiRequest } from '../../domain/muzakki.types';
import { useMuzakkiCreate } from '../../application/useMuzakkiCreate';

export const useMuzakkiCreateController = () => {
    const { createMuzakki, isLoading, error } = useMuzakkiCreate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MuzakkiFormValues>({
        // Casting Resolver
        resolver: zodResolver(muzakkiSchema) as unknown as Resolver<MuzakkiFormValues>,
    });

    const onSubmit: SubmitHandler<MuzakkiFormValues> = (data) => {
        const requestData = data as unknown as MuzakkiRequest;

        // Handle Promise catch
        createMuzakki(requestData)
            .catch((err: unknown) => {
                console.error("Gagal create muzakki:", err);
            });
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    };
};
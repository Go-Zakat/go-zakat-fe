'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { muzakkiSchema, MuzakkiFormValues } from '../../domain/muzakki.types';
import { useMuzakkiCreate } from '../../application/useMuzakkiCreate';

export const useMuzakkiCreateController = () => {
    const { createMuzakki, isLoading, error } = useMuzakkiCreate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MuzakkiFormValues>({
        resolver: zodResolver(muzakkiSchema),
    });

    const onSubmit = (data: MuzakkiFormValues) => {
        createMuzakki(data);
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

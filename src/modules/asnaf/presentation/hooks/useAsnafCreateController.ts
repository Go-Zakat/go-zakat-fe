'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { asnafSchema, AsnafFormValues } from '../../domain/asnaf.types';
import { useAsnafCreate } from '../../application/useAsnafCreate';

export const useAsnafCreateController = () => {
    const { createAsnaf, isLoading, error } = useAsnafCreate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AsnafFormValues>({
        resolver: zodResolver(asnafSchema),
    });

    const onSubmit = (data: AsnafFormValues) => {
        createAsnaf(data);
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

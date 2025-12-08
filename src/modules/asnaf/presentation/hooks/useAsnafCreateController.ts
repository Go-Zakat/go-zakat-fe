'use client';

import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { asnafSchema, AsnafFormValues } from '../../domain/asnaf.types';
import { useAsnafCreate } from '../../application/useAsnafCreate';
import { AsnafRequest } from '../../domain/asnaf.types';

export const useAsnafCreateController = () => {
    const { createAsnaf, isLoading, error } = useAsnafCreate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AsnafFormValues>({
        resolver: zodResolver(asnafSchema) as unknown as Resolver<AsnafFormValues>,
    });

    const onSubmit: SubmitHandler<AsnafFormValues> = (data) => {
        const requestData = data as unknown as AsnafRequest;

        createAsnaf(requestData)
            .catch((err: unknown) => {
                console.error("Gagal membuat asnaf:", err);
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
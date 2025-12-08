'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { asnafSchema, AsnafFormValues, AsnafRequest } from '../../domain/asnaf.types';
import { useAsnafUpdate } from '../../application/useAsnafUpdate';
import { useAsnafDetail } from '../../application/useAsnafDetail';

export const useAsnafUpdateController = (id: string) => {
    const { updateAsnaf, isLoading: isUpdating, error: updateError } = useAsnafUpdate();
    const { data: asnaf, isLoading: isLoadingDetail, error: detailError, getAsnafById } = useAsnafDetail();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AsnafFormValues>({
        resolver: zodResolver(asnafSchema) as unknown as Resolver<AsnafFormValues>,
    });

    useEffect(() => {
        if (id) {
            void getAsnafById(id);
        }
    }, [id, getAsnafById]);

    useEffect(() => {
        if (asnaf) {
            reset({
                name: asnaf.name,
                description: asnaf.description ?? '',
            });
        }
    }, [asnaf, reset]);

    const onSubmit: SubmitHandler<AsnafFormValues> = (data) => {
        const requestData = data as unknown as AsnafRequest;

        updateAsnaf(id, requestData)
            .catch((err: unknown) => {
                console.error("Gagal update asnaf:", err);
            });
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading: isUpdating || isLoadingDetail,
        error: updateError || detailError,
        onSubmit,
        asnaf,
    };
};
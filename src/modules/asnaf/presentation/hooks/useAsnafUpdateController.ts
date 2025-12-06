'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { asnafSchema, AsnafFormValues } from '../../domain/asnaf.types';
import { useAsnafUpdate } from '../../application/useAsnafUpdate';
import { useAsnafDetail } from '../../application/useAsnafDetail';

export const useAsnafUpdateController = (id: string) => {
    const router = useRouter();
    const { updateAsnaf, isLoading: isUpdating, error: updateError } = useAsnafUpdate();
    const { data: asnaf, isLoading: isLoadingDetail, error: detailError, getAsnafById } = useAsnafDetail();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AsnafFormValues>({
        resolver: zodResolver(asnafSchema),
    });

    useEffect(() => {
        if (id) {
            getAsnafById(id);
        }
    }, [id]);

    useEffect(() => {
        if (asnaf) {
            reset({
                name: asnaf.name,
                description: asnaf.description ?? '', // Handle nullable description
            });
        }
    }, [asnaf, reset]);

    const onSubmit = async (data: AsnafFormValues) => {
        try {
            await updateAsnaf(id, data);
            router.push('/asnaf');
        } catch (error) {
            console.error('Failed to update asnaf:', error);
        }
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

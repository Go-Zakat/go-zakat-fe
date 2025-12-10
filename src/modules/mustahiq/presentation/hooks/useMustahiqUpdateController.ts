'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mustahiqSchema, MustahiqFormValues, MustahiqRequest } from '../../domain/mustahiq.types';
import { useMustahiqUpdate } from '../../application/useMustahiqUpdate';
import { useMustahiqDetail } from '../../application/useMustahiqDetail';
import { useAsnafList } from '@/src/modules/asnaf/application/useAsnafList';

export const useMustahiqUpdateController = (id: string) => {
    const { updateMustahiq, isLoading: isUpdating, error: updateError } = useMustahiqUpdate();
    const { data: mustahiq, isLoading: isLoadingDetail, error: detailError, getMustahiqById } = useMustahiqDetail();
    const { getAsnafList, items: asnafList } = useAsnafList();

    useEffect(() => {
        void getAsnafList({ per_page: 100 });
        if (id) {
            void getMustahiqById(id);
        }
    }, [id, getAsnafList, getMustahiqById]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<MustahiqFormValues>({
        // Casting Resolver
        resolver: zodResolver(mustahiqSchema) as unknown as Resolver<MustahiqFormValues>,
    });

    useEffect(() => {
        if (mustahiq) {
            reset({
                name: mustahiq.name,
                address: mustahiq.address,
                phoneNumber: mustahiq.phoneNumber,
                // Handle nested object ID jika backend return object
                asnafID: mustahiq.asnafID || mustahiq.asnaf?.id || '',
                // Casting enum status agar aman
                status: mustahiq.status as MustahiqFormValues['status'],
                description: mustahiq.description ?? '',
            });
        }
    }, [mustahiq, reset]);

    const onSubmit: SubmitHandler<MustahiqFormValues> = (data) => {
        const requestData = data as unknown as MustahiqRequest;

        // Handle Promise catch
        updateMustahiq(id, requestData)
            .catch((err: unknown) => {
                console.error("Gagal update mustahiq:", err);
            });
    };

    const asnafValue = watch('asnafID');
    const statusValue = watch('status');

    return {
        register,
        handleSubmit,
        errors,
        isLoading: isUpdating || isLoadingDetail,
        error: updateError || detailError,
        onSubmit,
        mustahiq,
        asnafList,
        asnafValue,
        statusValue
    };
};
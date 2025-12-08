'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mustahiqSchema, MustahiqFormValues, MustahiqRequest } from '../../domain/mustahiq.types';
import { useMustahiqCreate } from '../../application/useMustahiqCreate';
import { useAsnafList } from '@/src/modules/asnaf/application/useAsnafList';

export const useMustahiqCreateController = () => {
    const { createMustahiq, isLoading, error } = useMustahiqCreate();
    const { getAsnafList, items: asnafList } = useAsnafList();

    useEffect(() => {
        void getAsnafList({ per_page: 100 });
    }, [getAsnafList]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MustahiqFormValues>({
        // Casting Resolver
        resolver: zodResolver(mustahiqSchema) as unknown as Resolver<MustahiqFormValues>,
        defaultValues: {
            status: 'active'
        }
    });

    const onSubmit: SubmitHandler<MustahiqFormValues> = (data) => {
        const requestData = data as unknown as MustahiqRequest;

        // Handle Promise catch
        createMustahiq(requestData)
            .catch((err: unknown) => {
                console.error("Gagal create mustahiq:", err);
            });
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        asnafList
    };
};
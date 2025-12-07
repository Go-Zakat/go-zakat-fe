'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mustahiqSchema, MustahiqFormValues } from '../../domain/mustahiq.types';
import { useMustahiqCreate } from '../../application/useMustahiqCreate';
import { useAsnafList } from '@/src/modules/asnaf/application/useAsnafList';

export const useMustahiqCreateController = () => {
    const { createMustahiq, isLoading, error } = useMustahiqCreate();

    // Fetch Asnaf List untuk Dropdown
    const { getAsnafList, items: asnafList } = useAsnafList();

    useEffect(() => {
        getAsnafList({ per_page: 100 });
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MustahiqFormValues>({
        resolver: zodResolver(mustahiqSchema),
        defaultValues: {
            status: 'active'
        }
    });

    const onSubmit = (data: MustahiqFormValues) => {
        createMustahiq(data);
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

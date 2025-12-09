'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { distributionSchema, DistributionFormValues, DistributionRequest } from '../../domain/distribution.types';
import { useDistributionCreate } from '../../application/useDistributionCreate';
import { useMustahiqList } from '@/src/modules/mustahiq/application/useMustahiqList';
import { useProgramList } from '@/src/modules/program/application/useProgramList';

export const useDistributionCreateController = () => {
    const { createDistribution, isLoading, error } = useDistributionCreate();

    // Fetch data master untuk dropdown
    const { getMustahiqList, items: mustahiqList } = useMustahiqList();
    const { getProgramList, items: programList } = useProgramList();

    useEffect(() => {
        // Ambil data aktif saja & limit besar agar semua muncul di dropdown
        void getMustahiqList({ per_page: 100, status: 'active' });
        void getProgramList({ per_page: 100, active: true });
    }, [getMustahiqList, getProgramList]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<DistributionFormValues>({
        resolver: zodResolver(distributionSchema) as unknown as Resolver<DistributionFormValues>,
        defaultValues: {
            distribution_date: new Date().toISOString().split('T')[0], // Today
            source_fund_type: 'zakat_fitrah', // Default
            items: [
                {
                    amount: 0,
                    notes: ''
                }
            ]
        }
    });

    // Handle dynamic items (Mustahiq rows)
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const onSubmit: SubmitHandler<DistributionFormValues> = (data) => {
        // Mapping form values to API Request payload
        const requestData: DistributionRequest = {
            distribution_date: data.distribution_date,
            program_id: data.program_id || undefined,
            source_fund_type: data.source_fund_type,
            notes: data.notes,
            items: data.items.map(item => ({
                mustahiq_id: item.mustahiq_id,
                amount: item.amount,
                notes: item.notes
            }))
        };

        createDistribution(requestData)
            .catch((err: unknown) => {
                console.error("Gagal membuat penyaluran:", err);
            });
    };

    return {
        register,
        control,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        mustahiqList,
        programList,
        fields,
        append,
        remove,
        watch,
        setValue
    };
};
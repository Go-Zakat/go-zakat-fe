'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { distributionSchema, DistributionFormValues, DistributionRequest } from '../../domain/distribution.types';
import { useDistributionUpdate } from '../../application/useDistributionUpdate';
import { useDistributionDetail } from '../../application/useDistributionDetail';
import { useMustahiqList } from '@/src/modules/mustahiq/application/useMustahiqList';
import { useProgramList } from '@/src/modules/program/application/useProgramList';

export const useDistributionUpdateController = (id: string) => {
    const { updateDistribution, isLoading: isUpdating, error: updateError } = useDistributionUpdate();
    const { getDistributionById, data: distribution, isLoading: isFetching, error: fetchError } = useDistributionDetail();

    // Data Master
    const { getMustahiqList, items: mustahiqList } = useMustahiqList();
    const { getProgramList, items: programList } = useProgramList();

    useEffect(() => {
        void getMustahiqList({ per_page: 100, status: 'active' });
        void getProgramList({ per_page: 100, active: true });

        if (id) {
            void getDistributionById(id);
        }
    }, [id, getMustahiqList, getProgramList, getDistributionById]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm<DistributionFormValues>({
        resolver: zodResolver(distributionSchema) as unknown as Resolver<DistributionFormValues>,
        defaultValues: {
            items: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    // Populate form when data fetched
    useEffect(() => {
        if (distribution) {
            reset({
                distribution_date: distribution.distribution_date ? new Date(distribution.distribution_date).toISOString().split('T')[0] : '',
                program_id: distribution.program?.id || '',
                source_fund_type: distribution.source_fund_type as DistributionFormValues['source_fund_type'],
                notes: distribution.notes || '',
                items: distribution.items?.map(item => ({
                    mustahiq_id: item.mustahiq_id,
                    amount: item.amount,
                    notes: item.notes || ''
                })) || []
            });
        }
    }, [distribution, reset]);

    const onSubmit: SubmitHandler<DistributionFormValues> = (data) => {
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

        updateDistribution(id, requestData)
            .catch((err: unknown) => {
                console.error("Gagal update penyaluran:", err);
            });
    };

    return {
        register,
        control,
        handleSubmit,
        errors,
        isLoading: isUpdating || isFetching,
        error: updateError || fetchError,
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
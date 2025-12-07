'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { mustahiqSchema, MustahiqFormValues } from '../../domain/mustahiq.types';
import { useMustahiqUpdate } from '../../application/useMustahiqUpdate';
import { useMustahiqDetail } from '../../application/useMustahiqDetail';
import { useAsnafList } from '@/src/modules/asnaf/application/useAsnafList'; // Import Asnaf List hook
import { MUSTAHIQ_STATUS } from '@/src/shared/config/constants';

export const useMustahiqUpdateController = (id: string) => {
    const router = useRouter();
    const { updateMustahiq, isLoading: isUpdating, error: updateError } = useMustahiqUpdate();
    const { data: mustahiq, isLoading: isLoadingDetail, error: detailError, getMustahiqById } = useMustahiqDetail();
    // Fetch Asnaf List for Dropdown
    const { getAsnafList, items: asnafList } = useAsnafList();

    useEffect(() => {
        getAsnafList({ per_page: 100 });
        if (id) {
            getMustahiqById(id);
        }
    }, [id]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MustahiqFormValues>({
        resolver: zodResolver(mustahiqSchema),
    });

    useEffect(() => {
        if (mustahiq) {
            reset({
                name: mustahiq.name,
                address: mustahiq.address,
                phoneNumber: mustahiq.phoneNumber,
                asnafID: mustahiq.asnafID || mustahiq.asnaf?.id || '',
                status: mustahiq.status,
                description: mustahiq.description ?? '',
            });
        }
    }, [mustahiq, reset]);

    const onSubmit = async (data: MustahiqFormValues) => {
        try {
            await updateMustahiq(id, data);
            router.push('/mustahiq');
        } catch (error) {
            console.error('Failed to update mustahiq:', error);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading: isUpdating || isLoadingDetail,
        error: updateError || detailError,
        onSubmit,
        mustahiq,
        asnafList,
    };
};

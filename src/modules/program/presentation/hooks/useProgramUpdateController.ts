'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { programSchema, ProgramFormValues } from '../../domain/program.types';
import { useProgramUpdate } from '../../application/useProgramUpdate';
import { useProgramDetail } from '../../application/useProgramDetail';

export const useProgramUpdateController = (id: string) => {
    const router = useRouter();
    const { updateProgram, isLoading: isUpdating, error: updateError } = useProgramUpdate();
    const { data: program, isLoading: isLoadingDetail, error: detailError, getProgramById } = useProgramDetail();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProgramFormValues>({
        resolver: zodResolver(programSchema),
    });

    useEffect(() => {
        if (id) {
            getProgramById(id);
        }
    }, [id]);

    useEffect(() => {
        if (program) {
            reset({
                name: program.name,
                description: program.description ?? '',
                type: program.type,
                active: program.active
            });
        }
    }, [program, reset]);

    const onSubmit = async (data: ProgramFormValues) => {
        try {
            await updateProgram(id, data);
            router.push('/programs');
        } catch (error) {
            console.error('Failed to update program:', error);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading: isUpdating || isLoadingDetail,
        error: updateError || detailError,
        onSubmit,
        program,
    };
};

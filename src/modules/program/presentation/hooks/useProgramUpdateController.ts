'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { programSchema, ProgramFormValues, ProgramRequest } from '../../domain/program.types';
import { useProgramUpdate } from '../../application/useProgramUpdate';
import { useProgramDetail } from '../../application/useProgramDetail';

export const useProgramUpdateController = (id: string) => {
    const { updateProgram, isLoading: isUpdating, error: updateError } = useProgramUpdate();
    const { data: program, isLoading: isLoadingDetail, error: detailError, getProgramById } = useProgramDetail();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProgramFormValues>({
        // Casting Resolver
        resolver: zodResolver(programSchema) as unknown as Resolver<ProgramFormValues>,
    });

    useEffect(() => {
        if (id) {
            // Void & Dependency
            void getProgramById(id);
        }
    }, [id, getProgramById]);

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

    const onSubmit: SubmitHandler<ProgramFormValues> = (data) => {
        const requestData = data as unknown as ProgramRequest;

        // Handle Promise catch
        updateProgram(id, requestData)
            .catch((err: unknown) => {
                console.error("Gagal update program:", err);
            });
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
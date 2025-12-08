'use client';

import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { programSchema, ProgramFormValues, ProgramRequest } from '../../domain/program.types';
import { useProgramCreate } from '../../application/useProgramCreate';

export const useProgramCreateController = () => {
    const { createProgram, isLoading, error } = useProgramCreate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProgramFormValues>({
        // Casting Resolver
        resolver: zodResolver(programSchema) as unknown as Resolver<ProgramFormValues>,
        defaultValues: {
            active: true
        }
    });

    const onSubmit: SubmitHandler<ProgramFormValues> = (data) => {
        const requestData = data as unknown as ProgramRequest;

        // Handle Promise catch
        createProgram(requestData)
            .catch((err: unknown) => {
                console.error("Gagal create program:", err);
            });
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    };
};
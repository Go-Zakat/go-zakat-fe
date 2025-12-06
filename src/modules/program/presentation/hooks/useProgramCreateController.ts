'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { programSchema, ProgramFormValues } from '../../domain/program.types';
import { useProgramCreate } from '../../application/useProgramCreate';

export const useProgramCreateController = () => {
    const { createProgram, isLoading, error } = useProgramCreate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProgramFormValues>({
        resolver: zodResolver(programSchema),
        defaultValues: {
            active: true
        }
    });

    const onSubmit = (data: ProgramFormValues) => {
        createProgram(data);
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

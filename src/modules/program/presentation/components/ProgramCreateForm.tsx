'use client';

import { useProgramCreateController } from '../hooks/useProgramCreateController';
import { ProgramForm } from './ProgramForm';

export const ProgramCreateForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useProgramCreateController();

    return (
        <ProgramForm
            isEditMode={false}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
        />
    );
};
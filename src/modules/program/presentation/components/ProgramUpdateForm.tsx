'use client';

import { useProgramUpdateController } from '../hooks/useProgramUpdateController';
import { ProgramForm } from './ProgramForm';

interface ProgramUpdateFormProps {
    id: string;
}

export const ProgramUpdateForm = ({ id }: ProgramUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useProgramUpdateController(id);

    return (
        <ProgramForm
            isEditMode={true}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
        />
    );
};
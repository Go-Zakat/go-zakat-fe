'use client';

import { useMuzakkiUpdateController } from '../hooks/useMuzakkiUpdateController';
import { MuzakkiForm } from './MuzakkiForm';

interface MuzakkiUpdateFormProps {
    id: string;
}

export const MuzakkiUpdateForm = ({ id }: MuzakkiUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useMuzakkiUpdateController(id);

    return (
        <MuzakkiForm
            isEditMode={true}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
        />
    );
};
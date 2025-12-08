'use client';

import { useAsnafUpdateController } from '../hooks/useAsnafUpdateController';
import { AsnafForm } from './AsnafForm';

interface AsnafUpdateFormProps {
    id: string;
}

export const AsnafUpdateForm = ({ id }: AsnafUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useAsnafUpdateController(id);

    return (
        <AsnafForm
            isEditMode={true}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
        />
    );
};
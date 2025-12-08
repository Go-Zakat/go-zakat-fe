'use client';

import { useAsnafCreateController } from '../hooks/useAsnafCreateController';
import { AsnafForm } from './AsnafForm';

export const AsnafCreateForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useAsnafCreateController();

    return (
        <AsnafForm
            isEditMode={false}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
        />
    );
};
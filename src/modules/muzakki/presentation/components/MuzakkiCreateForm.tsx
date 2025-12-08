'use client';

import { useMuzakkiCreateController } from '../hooks/useMuzakkiCreateController';
import { MuzakkiForm } from './MuzakkiForm';

export const MuzakkiCreateForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useMuzakkiCreateController();

    return (
        <MuzakkiForm
            isEditMode={false}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
        />
    );
};
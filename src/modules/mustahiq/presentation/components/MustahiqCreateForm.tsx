'use client';

import { useMustahiqCreateController } from '../hooks/useMustahiqCreateController';
import { MustahiqForm } from './MustahiqForm';

export const MustahiqCreateForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        asnafList
    } = useMustahiqCreateController();

    return (
        <MustahiqForm
            isEditMode={false}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
            asnafList={asnafList}
        />
    );
};
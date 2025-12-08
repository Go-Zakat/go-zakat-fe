'use client';

import { useMustahiqUpdateController } from '../hooks/useMustahiqUpdateController';
import { MustahiqForm } from './MustahiqForm';

interface MustahiqUpdateFormProps {
    id: string;
}

export const MustahiqUpdateForm = ({ id }: MustahiqUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        asnafList
    } = useMustahiqUpdateController(id);

    return (
        <MustahiqForm
            isEditMode={true}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
            asnafList={asnafList}
        />
    );
};
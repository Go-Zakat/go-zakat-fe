'use client';

import { useDistributionUpdateController } from '../hooks/useDistributionUpdateController';
import { DistributionForm } from './DistributionForm';

interface DistributionUpdateFormProps {
    id: string;
}

export const DistributionUpdateForm = ({ id }: DistributionUpdateFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        mustahiqList,
        programList,
        fields,
        append,
        remove,
        watch,
    } = useDistributionUpdateController(id);

    return (
        <DistributionForm
            isEditMode={true}
            register={register}
            errors={errors}
            control={control}
            watch={watch}
            fields={fields}
            append={append}
            remove={remove}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
            mustahiqList={mustahiqList}
            programList={programList}
        />
    );
};
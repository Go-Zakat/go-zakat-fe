'use client';

import { useDistributionCreateController } from '../hooks/useDistributionCreateController';
import { DistributionForm } from './DistributionForm';

export const DistributionCreateForm = () => {
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
    } = useDistributionCreateController();

    return (
        <DistributionForm
            isEditMode={false}
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
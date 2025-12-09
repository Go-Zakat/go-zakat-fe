'use client';

import { useDonationReceiptUpdateController } from '../hooks/useDonationReceiptUpdateController';
import { DonationReceiptForm } from './DonationReceiptForm';

interface DonationReceiptUpdateFormProps {
    id: string;
}

export const DonationReceiptUpdateForm = ({ id }: DonationReceiptUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        muzakkiList,
        fields,
        append,
        remove,
        watch,
        control
    } = useDonationReceiptUpdateController(id);

    return (
        <DonationReceiptForm
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
            muzakkiList={muzakkiList}
        />
    );
};
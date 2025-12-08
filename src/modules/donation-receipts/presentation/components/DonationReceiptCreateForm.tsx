'use client';

import { useDonationReceiptCreateController } from '../hooks/useDonationReceiptCreateController';
import { DonationReceiptForm } from './DonationReceiptForm';

export const DonationReceiptCreateForm = () => {
    const {
        register,
        handleSubmit,
        control,
        errors,
        isLoading,
        error,
        onSubmit,
        muzakkiList,
        fields,
        append,
        remove,
        watch,
    } = useDonationReceiptCreateController();

    return (
        <DonationReceiptForm
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
            muzakkiList={muzakkiList}
        />
    );
};
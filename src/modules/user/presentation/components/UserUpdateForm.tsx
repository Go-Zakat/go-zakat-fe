'use client';

import { useUserUpdateController } from '../hooks/useUserUpdateController';
import { UserForm } from './UserForm';

interface UserUpdateFormProps {
    id: string;
}

export const UserUpdateForm = ({ id }: UserUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        user
    } = useUserUpdateController(id);

    return (
        <UserForm
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            error={error}
            userName={user?.name}
            userEmail={user?.email}
        />
    );
};

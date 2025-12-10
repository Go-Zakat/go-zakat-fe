'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateRoleSchema, UpdateRoleFormValues, UpdateRoleRequest } from '../../domain/user.types';
import { useUserUpdateRole } from '../../application/useUserUpdateRole';
import { useUserDetail } from '../../application/useUserDetail';
import { useRouter } from 'next/navigation';

export const useUserUpdateController = (id: string) => {
    const router = useRouter();
    const { updateUserRole, isLoading: isUpdating, error: updateError } = useUserUpdateRole();
    const { data: user, isLoading: isLoadingDetail, error: detailError, getUserById } = useUserDetail();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<UpdateRoleFormValues>({
        resolver: zodResolver(updateRoleSchema) as unknown as Resolver<UpdateRoleFormValues>,
    });

    useEffect(() => {
        if (id) {
            void getUserById(id);
        }
    }, [id, getUserById]);

    useEffect(() => {
        if (user) {
            reset({
                role: user.role as UpdateRoleFormValues['role'],
            });
        }
    }, [user, reset]);

    const onSubmit: SubmitHandler<UpdateRoleFormValues> = async (data) => {
        const requestData = data as unknown as UpdateRoleRequest;

        const success = await updateUserRole(id, requestData);
        if (success) {
            router.push('/user');
        }
    };

    // eslint-disable-next-line react-hooks/incompatible-library
    const roleValue = watch('role');

    return {
        register,
        handleSubmit,
        errors,
        isLoading: isUpdating || isLoadingDetail,
        error: updateError || detailError,
        onSubmit,
        user,
        roleValue
    };
};

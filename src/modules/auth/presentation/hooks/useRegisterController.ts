'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterRequest } from '../../domain/auth.types';
import { useRegister } from '../../application/useRegister';
import { useGoogleLogin } from '../../application/useGoogleLogin';

/**
 * Controller untuk Register Logic
 * Menggabungkan `useRegister`, `useGoogleLogin`, dan `react-hook-form`.
 */
export const useRegisterController = () => {
    const { register: registerUser, isLoading, error } = useRegister();
    const { loginWithGoogle, isLoading: isGoogleLoading } = useGoogleLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const onSubmit = (data: RegisterRequest) => {
        registerUser(data);
    };

    return {
        register,
        handleSubmit,
        errors,
        isLoading,
        isGoogleLoading,
        error,
        onSubmit,
        loginWithGoogle,
    };
};

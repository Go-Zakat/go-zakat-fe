'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginRequest } from '../../domain/auth.types';
import { useLogin } from '../../application/useLogin';
import { useGoogleLogin } from '../../application/useGoogleLogin';

/**
 * Controller untuk Login Logic
 * Menggabungkan `useLogin`, `useGoogleLogin`, dan `react-hook-form`.
 */
export const useLoginController = () => {
    const { login, isLoading, error } = useLogin();
    const { loginWithGoogle, isLoading: isGoogleLoading } = useGoogleLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = (data: LoginRequest) => {
        void login(data);
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
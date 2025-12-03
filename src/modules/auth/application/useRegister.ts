'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../infrastructure/auth.api';
import { RegisterRequest } from '../domain/auth.types';
import { authStorage } from '@/src/shared/lib/authStorage';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * useRegister Hook
 * Hook untuk handle register logic
 */
export const useRegister = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Register Function
     * Melakukan register dan auto-login, lalu redirect ke dashboard
     */
    const register = async (data: RegisterRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            // Panggil API register
            const response = await authApi.register(data);
            const { access_token, refresh_token, user } = response.data;

            // Simpan tokens (auto-login setelah register)
            authStorage.setAccessToken(access_token);
            authStorage.setRefreshToken(refresh_token);

            // Simpan user data
            authStorage.setUser({
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            });

            // Redirect ke dashboard
            router.push('/dashboard');
        } catch (err: unknown) {
            // Extract error message
            const errorMessage = extractErrorMessage(err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        isLoading,
        error,
    };
};

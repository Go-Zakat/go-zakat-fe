'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../infrastructure/auth.api';
import { LoginRequest } from '../domain/auth.types';
import { authStorage } from '@/src/shared/lib/authStorage';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

/**
 * useLogin Hook
 * Hook untuk handle login logic
 */
export const useLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Login Function
     * Melakukan login dan redirect ke dashboard jika berhasil
     */
    const login = async (data: LoginRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            // Panggil API login
            const response = await authApi.login(data);
            const { access_token, refresh_token, user } = response.data;

            // Simpan tokens
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
        login,
        isLoading,
        error,
    };
};

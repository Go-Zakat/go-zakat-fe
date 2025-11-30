'use client';

import { useState } from 'react';
import { authStorage } from '@/src/shared/lib/authStorage';
import { env } from '@/src/shared/config/env';

/**
 * useGoogleLogin Hook
 * Hook untuk handle Google OAuth login
 */
export const useGoogleLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Initiate Google Login
     * Redirect user ke Google OAuth page
     */
    const loginWithGoogle = async () => {
        setIsLoading(true);

        try {
            // Redirect ke endpoint Google login untuk mendapatkan OAuth URL
            window.location.href = `${env.NEXT_PUBLIC_API_URL}/api/v1/auth/google/login`;
        } catch (error) {
            console.error('Google login error:', error);
            setIsLoading(false);
        }
    };

    return {
        loginWithGoogle,
        isLoading,
    };
};

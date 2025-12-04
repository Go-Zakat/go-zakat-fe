'use client';

import { useState } from 'react';
import { authApi } from '../infrastructure/auth.api';

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
            // Fetch auth URL dari backend menggunakan asnafApi
            const response = await authApi.getGoogleLoginUrl();

            if (response.success && response.data?.auth_url) {
                // Redirect ke Google OAuth page
                window.location.href = response.data.auth_url;
            } else {
                console.error('Failed to get Google auth URL:', response);
                setIsLoading(false);
            }
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

'use client';

import { useRouter } from 'next/navigation';
import { authStorage } from '@/src/shared/lib/authStorage';

/**
 * useLogout Hook
 * Hook untuk handle logout
 */
export const useLogout = () => {
    const router = useRouter();

    /**
     * Logout Function
     * Clear tokens dan redirect ke login
     */
    const logout = () => {
        // Clear semua tokens
        authStorage.clearTokens();

        // Redirect ke login page
        router.push('/login');
    };

    return {
        logout,
    };
};

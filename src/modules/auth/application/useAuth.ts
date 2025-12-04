'use client';

import { useState, useEffect } from 'react';
import { authStorage, StoredUser } from '@/src/shared/lib/authStorage';

/**
 * useAsnaf Hook
 * Hook untuk mengakses data user yang sedang login
 */
export const useAuth = () => {
    const [user, setUser] = useState<StoredUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Ambil user data dari storage saat component mount
        const storedUser = authStorage.getUser();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(storedUser);
        setIsLoading(false);
    }, []);

    const isAuthenticated = !!user && authStorage.hasToken();

    return {
        user,
        isAuthenticated,
        isLoading,
    };
};

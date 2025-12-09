'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authStorage } from '@/src/shared/lib/authStorage';

export const useDashboardTokenHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const userName = searchParams.get('user_name');
        const userEmail = searchParams.get('user_email');
        const userRole = searchParams.get('user_role');

        // Jika token ditemukan di URL (skenario redirect dari backend)
        if (accessToken && refreshToken) {
            // 1. Simpan Token ke Storage
            authStorage.setAccessToken(accessToken);
            authStorage.setRefreshToken(refreshToken);

            // 2. Simpan Data User
            if (userName && userEmail && userRole) {
                authStorage.setUser({
                    name: decodeURIComponent(userName),
                    email: decodeURIComponent(userEmail),
                    role: decodeURIComponent(userRole),
                });
            }

            // 3. Bersihkan URL (Hapus query params)
            // Kita replace ke '/dashboard' murni agar token tidak terlihat user
            router.replace('/dashboard');
        }
    }, [searchParams, router]);
};
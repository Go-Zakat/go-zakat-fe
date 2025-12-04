'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authStorage } from '@/src/shared/lib/authStorage';

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Handle Google OAuth callback params
    useEffect(() => {
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const userName = searchParams.get('user_name');
        const userEmail = searchParams.get('user_email');
        const userRole = searchParams.get('user_role');

        if (accessToken && refreshToken) {
            // Simpan tokens
            authStorage.setAccessToken(accessToken);
            authStorage.setRefreshToken(refreshToken);

            // Simpan user data jika ada di URL params (dari Google login)
            if (userName && userEmail && userRole) {
                authStorage.setUser({
                    name: decodeURIComponent(userName),
                    email: decodeURIComponent(userEmail),
                    role: decodeURIComponent(userRole),
                });
            }

            // Reload halaman untuk memastikan Header membaca data user yang baru
            // Menggunakan window.location.href agar Header component re-mount dan useAsnaf re-run
            window.location.href = '/dashboard';
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md w-full">
                <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Selamat datang! Login berhasil.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Dashboard Page
 * Halaman dashboard utama
 */
export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}

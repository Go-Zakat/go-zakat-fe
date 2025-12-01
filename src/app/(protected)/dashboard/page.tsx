'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authStorage } from '@/src/shared/lib/authStorage';
import { useLogout } from '@/src/modules/auth/application/useLogout';

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { logout } = useLogout();

    // Handle Google OAuth callback params
    useEffect(() => {
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');

        if (accessToken && refreshToken) {
            // Simpan tokens
            authStorage.setAccessToken(accessToken);
            authStorage.setRefreshToken(refreshToken);

            // Bersihkan URL params agar lebih rapi
            router.replace('/dashboard');
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

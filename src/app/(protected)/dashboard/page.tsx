'use client';

import { useLogout } from '@/src/modules/auth/application/useLogout';

/**
 * Dashboard Page
 * Halaman dashboard utama (placeholder)
 */
export default function DashboardPage() {
    const { logout } = useLogout();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
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

                    <div className="pt-4 border-t border-gray-200">
                        <button
                            onClick={logout}
                            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

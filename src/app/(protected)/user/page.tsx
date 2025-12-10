'use client';

import { UserList } from '@/src/modules/user/presentation/components/UserList';
import { PageHeader } from "@/src/shared/ui/layout/PageHeader";
import { AnimatedContainer } from "@/src/shared/ui/components/AnimatedContainer";
import { useAuth } from "@/src/modules/auth/application/useAuth";

export default function UserPage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return null; // Or a loading spinner
    }

    const hasAccess = user?.role === 'admin' || user?.role === 'staf';

    if (!hasAccess) {
        return (
            <AnimatedContainer>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-full">
                        <svg
                            className="w-12 h-12 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Akses Ditolak
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                            Maaf, Anda tidak memiliki izin untuk mengakses halaman manajemen pengguna. Halaman ini hanya untuk Administrator dan Staf.
                        </p>
                    </div>
                </div>
            </AnimatedContainer>
        );
    }

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Daftar Pengguna"
                breadcrumbs={[
                    { label: 'Sumber Daya' },
                    { label: 'Pengguna' },
                ]}
            />

            <UserList />
        </AnimatedContainer>
    );
}

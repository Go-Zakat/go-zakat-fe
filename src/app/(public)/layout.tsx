'use client';

import { ReactNode } from 'react';
import { ServerStatusBanner } from "@/src/shared/ui/components/ServerStatusBanner";

/**
 * Public Layout
 * Layout untuk halaman-halaman public (login, register)
 * Tanpa sidebar, centered di tengah layar
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-dark-paper">
            <ServerStatusBanner />
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}

import { ReactNode } from 'react';

/**
 * Public Layout
 * Layout untuk halaman-halaman public (login, register)
 * Tanpa sidebar, centered di tengah layar
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-paper py-12 px-4 sm:px-6 lg:px-8 ">
            {children}
        </div>
    );
}

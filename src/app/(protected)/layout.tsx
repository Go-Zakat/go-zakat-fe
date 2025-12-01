'use client';

import { ReactNode, useState } from 'react';
import {Header} from "@/src/shared/components/layout/Header";
import {Sidebar} from "@/src/shared/components/layout/Sidebar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <Sidebar
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-y-auto ">
                <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

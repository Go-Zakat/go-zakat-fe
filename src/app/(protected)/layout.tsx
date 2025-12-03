'use client';

import { ReactNode, useState } from 'react';
import {Header} from "@/src/shared/ui/layout/Header";
import {Sidebar} from "@/src/shared/ui/layout/Sidebar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen">
            <Sidebar
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
                isCollapsed={isSidebarCollapsed}
            />

            <div className="flex-1 flex flex-col overflow-y-auto ">
                <Header
                    onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
                    onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

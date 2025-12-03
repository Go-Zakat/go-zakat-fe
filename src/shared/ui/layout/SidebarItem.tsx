'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    isCollapsed?: boolean;
}

export function SidebarItem({ icon: Icon, label, href, isCollapsed }: SidebarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={clsx(
                'flex items-center rounded-xl transition-all duration-200 group relative overflow-hidden px-4 py-3',
                isCollapsed ? 'justify-center' : 'gap-3',
                isActive
                    ? 'bg-blue-600/80 text-white'
                    : 'text-gray-600 hover:bg-blue-600/10 hover:text-gray-900'
            )}
        >
            <Icon
                size={20}
                className={clsx(
                    'flex-shrink-0 transition-colors',
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                )}
            />

            {/* Sembunyikan label kalau sidebar collapsed */}
            {!isCollapsed && (
                <span className="font-medium text-sm">
                    {label}
                </span>
            )}
        </Link>
    );
}
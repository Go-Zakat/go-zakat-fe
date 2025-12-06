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
                'flex items-center rounded-lg group relative overflow-hidden px-4 py-3',
                isCollapsed ? 'justify-center' : 'gap-3',
                isActive
                    ? 'bg-primary-blue text-white'
                    : 'text-gray-600 dark:text-text-secondary hover:bg-blue-600/10 dark:hover:bg-primary-blue/10 hover:text-gray-900 dark:hover:text-text-primary'
            )}
        >
            <Icon
                size={20}
                className={clsx(
                    'shrink-0',
                    isActive ? 'text-white' : 'text-gray-500 dark:text-text-secondary group-hover:text-gray-700 dark:group-hover:text-text-primary'
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
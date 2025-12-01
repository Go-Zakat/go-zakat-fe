'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}

export function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden',
                isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
        >
            <Icon
                size={20}
                className={clsx(
                    'flex-shrink-0 transition-colors',
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                )}
            />

            <span className="font-medium text-sm">
                {label}
            </span>
        </Link>
    );
}

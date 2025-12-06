'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    backUrl?: string;
    children?: ReactNode;
}

export const PageHeader = ({ title, breadcrumbs, backUrl, children }: PageHeaderProps) => {
    return (
        <div className="bg-blue-600/10 rounded-lg p-4 sm:p-5 lg:p-6 relative overflow-hidden">
            <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {backUrl && (
                        <Link
                            href={backUrl}
                            className="p-2 rounded-full hover:bg-blue-600/10 dark:hover:bg-blue-400/10 transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                        </Link>
                    )}
                    <div>
                        <h5 className="font-medium mb-1 truncate text-lg lg:text-xl text-gray-900 dark:text-white">
                            {title}
                        </h5>
                        <p className="truncate text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            {breadcrumbs.map((item, index) => (
                                <span key={index} className="flex items-center">
                                    {index > 0 && <span className="px-1">●</span>}
                                    {item.label}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                {children && <div>{children}</div>}
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full" />
        </div>
    );
};

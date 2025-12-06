'use client';

import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    HandHeart,
    Wallet,
    FileText,
    Menu,
    Receipt,
    Send,
    X,
    Ellipsis
} from 'lucide-react';
import { clsx } from 'clsx';
import { SidebarItem } from './SidebarItem';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    isMobileOpen: boolean;
    onMobileClose: () => void;
    isCollapsed: boolean;
}

export function Sidebar({ isMobileOpen, onMobileClose, isCollapsed }: SidebarProps) {
    // hover expand hanya dipakai ketika sidebar dalam keadaan collapsed
    const [isHoverExpanded, setIsHoverExpanded] = useState(false);

    // ini yang dipakai untuk nentuin apakah icon-only atau pakai label
    const isViewCollapsed = isCollapsed && !isHoverExpanded;

    const sidebarVariants = {
        expanded: { width: '16rem' }, // 64 * 0.25rem = 16rem
        collapsed: { width: '5rem' }, // 20 * 0.25rem = 5rem
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 lg:hidden z-30 backdrop-blur-sm bg-black/30"
                        onClick={onMobileClose}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                onMouseEnter={() => {
                    if (isCollapsed) setIsHoverExpanded(true);
                }}
                onMouseLeave={() => {
                    if (isCollapsed) setIsHoverExpanded(false);
                }}
                initial={false}
                animate={isViewCollapsed ? 'collapsed' : 'expanded'}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={clsx(
                    'fixed inset-y-0 left-0 z-40 h-screen overflow-visible bg-white dark:bg-dark-paper border-r border-gray-200 dark:border-dark-border',
                    'lg:static lg:inset-auto', // Reset fixed positioning on desktop
                    'transform transition-transform duration-300 lg:transition-none', // ⬅️ tambahin ini
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0' // Handle mobile slide-in
                )}
                style={{
                    width: isViewCollapsed ? '5rem' : '16rem', // Fallback/Initial width
                }}
            >
                <div className="flex h-full flex-col w-full">
                    {/* HEADER - LOGO */}
                    <div className="h-[70px] flex items-center px-6 overflow-hidden">
                        <Link href="/dashboard" className="flex items-center gap-3 min-w-max">
                            <AnimatePresence mode="wait">
                                {isViewCollapsed ? (
                                    <motion.span
                                        key="logo-collapsed"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="font-bold text-xl tracking-tight whitespace-nowrap"
                                    >
                                        GZ
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="logo-expanded"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="font-bold text-xl tracking-tight whitespace-nowrap"
                                    >
                                        Go Zakat
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        <button
                            onClick={onMobileClose}
                            className={clsx(
                                'ml-auto lg:hidden text-slate-600 hover:text-slate-900 cursor-pointer',
                                isViewCollapsed && 'hidden'
                            )}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* NAVIGASI */}
                    <div
                        className={clsx(
                            'flex-1 py-6 px-4 space-y-6',
                            isViewCollapsed
                                ? 'overflow-hidden'
                                : 'overflow-y-auto overflow-x-hidden scrollbar-modern'
                        )}
                    >
                        {/* Home */}
                        <div className="space-y-1">
                            <div
                                className={clsx(
                                    'px-4 text-[11px] font-medium uppercase tracking-[0.16em] mb-2 transition-all duration-300 flex',
                                    isViewCollapsed
                                        ? 'justify-center items-center text-slate-300'
                                        : 'justify-start text-slate-400/80'
                                )}
                            >
                                {isViewCollapsed ? <Ellipsis size={14} /> : 'Home'}
                            </div>
                            <SidebarItem
                                icon={LayoutDashboard}
                                label="Dashboard"
                                href="/dashboard"
                                isCollapsed={isViewCollapsed}
                            />
                        </div>

                        {/* Master Data Group */}
                        <div className="space-y-1">
                            <div
                                className={clsx(
                                    'px-4 text-[11px] font-medium uppercase tracking-[0.16em] mb-2 transition-all duration-300 flex truncate',
                                    isViewCollapsed
                                        ? 'justify-center items-center text-slate-300'
                                        : 'justify-start text-slate-400/80'
                                )}
                            >
                                {isViewCollapsed ? <Ellipsis size={14} /> : 'MASTER DATA'}
                            </div>
                            <SidebarItem icon={Users} label="Asnaf" href="/asnaf" isCollapsed={isViewCollapsed} />
                            <SidebarItem icon={HandHeart} label="Mustahiq" href="/mustahiq" isCollapsed={isViewCollapsed} />
                            <SidebarItem icon={Wallet} label="Muzakki" href="/muzakki" isCollapsed={isViewCollapsed} />
                            <SidebarItem icon={Menu} label="Programs" href="/programs" isCollapsed={isViewCollapsed} />
                            <SidebarItem icon={Users} label="Users" href="/users" isCollapsed={isViewCollapsed} />
                        </div>

                        {/* Operasional Group */}
                        <div className="space-y-1">
                            <div
                                className={clsx(
                                    'px-4 text-[11px] font-medium uppercase tracking-[0.16em] mb-2 transition-all duration-300 flex',
                                    isViewCollapsed
                                        ? 'justify-center items-center text-slate-300'
                                        : 'justify-start text-slate-400/80'
                                )}
                            >
                                {isViewCollapsed ? <Ellipsis size={14} /> : 'Operasional'}
                            </div>
                            <SidebarItem
                                icon={Receipt}
                                label="Penerimaan"
                                href="/donation-receipts"
                                isCollapsed={isViewCollapsed}
                            />
                            <SidebarItem
                                icon={Send}
                                label="Penyaluran"
                                href="/distributions"
                                isCollapsed={isViewCollapsed}
                            />
                        </div>

                        {/* Reports Group */}
                        <div className="space-y-1">
                            <div
                                className={clsx(
                                    'px-4 text-[11px] font-medium uppercase tracking-[0.16em] mb-2 transition-all duration-300 flex',
                                    isViewCollapsed
                                        ? 'justify-center items-center text-slate-300'
                                        : 'justify-start text-slate-400/80'
                                )}
                            >
                                {isViewCollapsed ? <Ellipsis size={14} /> : 'Laporan'}
                            </div>
                            <SidebarItem
                                icon={FileText}
                                label="Laporan"
                                href="/reports"
                                isCollapsed={isViewCollapsed}
                            />
                        </div>
                    </div>

                    {/* FOOTER - STICKY BAWAH */}
                    <div className="p-6 overflow-hidden">
                        <AnimatePresence>
                            {!isViewCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-blue-600/10 rounded-lg p-4 relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <h5 className="font-semibold mb-1 truncate">
                                            Butuh Bantuan?
                                        </h5>
                                        <p className="text-xs mb-3 truncate">
                                            Hubungi tim support kami
                                        </p>
                                        <button className="cursor-pointer text-xs bg-blue-600/80 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700/80 transition-colors truncate">
                                            Contact Support
                                        </button>
                                    </div>
                                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}

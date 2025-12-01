'use client';

import {
    LayoutDashboard,
    Users,
    HandHeart,
    Wallet,
    FileText,
    Menu,
    Receipt,
    Send,
    X
} from 'lucide-react';
import { clsx } from 'clsx';
import { SidebarItem } from './SidebarItem';
import Link from 'next/link';

interface SidebarProps {
    isMobileOpen: boolean;
    onMobileClose: () => void;
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={onMobileClose}
                />
            )}

            <aside
                className={clsx(
                    // posisi + ukuran sidebar
                    'fixed inset-y-0 left-0 z-40 w-64 h-screen',
                    // animasi slide
                    'transition-transform duration-300 ease-in-out transform',
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full',
                    'lg:translate-x-0 lg:static lg:inset-auto',
                    // styling
                    'lg:border-r border-gray-200'
                )}
            >
                {/* wrapper biar bisa header (atas), nav (tengah scroll), footer (bawah) */}
                <div className="flex h-full flex-col">
                    {/* HEADER - STICKY ATAS */}
                    <div className="h-[70px] flex items-center px-6">
                        <Link href="/dashboard" className="flex items-center gap-3">
              <span className="font-bold text-xl tracking-tight">
                Go Zakat
              </span>
                        </Link>

                        <button
                            onClick={onMobileClose}
                            className="ml-auto lg:hidden text-slate-400 hover:text-slate-100"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* NAVIGASI - CUMA BAGIAN INI YANG SCROLL */}
                    <div className="flex-1 overflow-y-auto scrollbar-modern py-6 px-4 space-y-6">
                        {/* Main Group */}
                        <div className="space-y-1">
                            <div className="px-4 text-[11px] font-medium text-slate-400/80 uppercase tracking-[0.16em] mb-2">
                                Home
                            </div>
                            <SidebarItem
                                icon={LayoutDashboard}
                                label="Dashboard"
                                href="/dashboard"
                            />
                        </div>

                        {/* Master Data Group */}
                        <div className="space-y-1">
                            <div className="px-4 text-[11px] font-medium text-slate-400/80 uppercase tracking-[0.16em] mb-2 mt-4">
                                Master Data
                            </div>
                            <SidebarItem icon={Users} label="Asnaf" href="/asnaf" />
                            <SidebarItem icon={HandHeart} label="Mustahiq" href="/mustahiq" />
                            <SidebarItem icon={Wallet} label="Muzakki" href="/muzakki" />
                            <SidebarItem icon={Menu} label="Programs" href="/programs" />
                            <SidebarItem icon={Users} label="Users" href="/users" />
                        </div>

                        {/* Operasional Group */}
                        <div className="space-y-1">
                            <div className="px-4 text-[11px] font-medium text-slate-400/80 uppercase tracking-[0.16em] mb-2 mt-4">
                                Operasional
                            </div>
                            <SidebarItem
                                icon={Receipt}
                                label="Penerimaan"
                                href="/donation-receipts"
                            />
                            <SidebarItem
                                icon={Send}
                                label="Penyaluran"
                                href="/distributions"
                            />
                        </div>

                        {/* Reports Group */}
                        <div className="space-y-1">
                            <div className="px-4 text-[11px] font-medium text-slate-400/80 uppercase tracking-[0.16em] mb-2 mt-4">
                                Laporan
                            </div>
                            <SidebarItem
                                icon={FileText}
                                label="Laporan"
                                href="/reports"
                            />
                        </div>
                    </div>

                    {/* FOOTER - STICKY BAWAH */}
                    <div className="p-6">
                        <div className="bg-blue-600/10 rounded-xl p-4 relative overflow-hidden">
                            <div className="relative z-10">
                                <h5 className="font-semibold text-slate-50 mb-1">
                                    Butuh Bantuan?
                                </h5>
                                <p className="text-xs text-slate-300 mb-3">
                                    Hubungi tim support kami
                                </p>
                                <button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full" />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

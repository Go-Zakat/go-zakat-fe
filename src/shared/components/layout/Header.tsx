'use client';

import { useState } from 'react';
import { Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useLogout } from '@/src/modules/auth/application/useLogout';
import Link from 'next/link';

interface HeaderProps {
    onMobileMenuClick: () => void;
}

export function Header({ onMobileMenuClick }: HeaderProps) {
    const { logout } = useLogout();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-20 w-full backdrop-blur-md px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left: Mobile Toggle & Search */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMobileMenuClick}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-full text-gray-600"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center gap-4">
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 hover:bg-gray-50 rounded-full p-1 pr-3 transition-colors border border-transparent hover:border-gray-100"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <User size={18} />
                            </div>
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
                            <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsProfileOpen(false)}
                                ></div>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                        <p className="text-sm font-semibold text-gray-900">My Profile</p>
                                        <p className="text-xs text-gray-500">admin@gozakat.id</p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                    >
                                        <User size={16} />
                                        Profile
                                    </Link>

                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

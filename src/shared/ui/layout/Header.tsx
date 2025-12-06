'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, User, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';
import { useLogout } from '@/src/modules/auth/application/useLogout';
import { useAuth } from '@/src/modules/auth/application/useAuth';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface HeaderProps {
    onMobileMenuClick: () => void;
    onToggleSidebar: () => void;
    isSidebarCollapsed: boolean;
}

export function Header({
    onMobileMenuClick,
    onToggleSidebar,
    isSidebarCollapsed,
}: HeaderProps) {
    const { logout } = useLogout();
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="sticky top-0 z-20 w-full bg-white dark:bg-dark-paper px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left: Mobile Toggle & Sidebar Toggle */}
                <div className="flex items-center gap-2">
                    {/* Mobile: buka sidebar (off-canvas) */}
                    <button
                        onClick={onMobileMenuClick}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 lg:hidden cursor-pointer"
                        aria-label="Buka menu"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Desktop: collapse / expand sidebar */}
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hidden lg:inline-flex cursor-pointer"
                        aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Minimize sidebar'}
                    >
                        <Menu size={20} className="hover:cursor-pointer" />
                    </button>
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center gap-4 ">
                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-text-secondary transition-colors cursor-pointer"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    )}

                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 hover:bg-blue-600/10 dark:hover:bg-blue-600/20 rounded-full sm:p-1 sm:pr-3 transition-colors cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center text-white">
                                <User size={18} />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-text-primary hidden sm:block">
                                {user?.name || 'User'}
                            </span>
                            <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 py-2 z-20"
                                >
                                    <div className="px-4 py-2 border-b border-gray-50 dark:border-gray-700 mb-1">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        <User size={16} />
                                        Profile
                                    </Link>

                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left cursor-pointer"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}

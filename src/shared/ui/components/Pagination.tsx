'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface PaginationProps {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    isLoading?: boolean;
    onPageChange: (page: number) => void;
    onPerPageChange: (newPerPage: number) => void;
    pageSizeOptions?: number[];
}

export const Pagination = ({
    page,
    perPage,
    totalItems,
    totalPages,
    isLoading = false,
    onPageChange,
    onPerPageChange,
    pageSizeOptions = [10, 20, 50]
}: PaginationProps) => {
    // Logika perhitungan "Showing X-Y of Z"
    const startItem = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
    const endItem = Math.min(page * perPage, totalItems);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="px-6 py-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between gap-4 bg-white dark:bg-dark-paper">
            {/* Bagian Kiri: Rows Per Page */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-text-secondary">
                <span>Rows per page:</span>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => !isLoading && setIsOpen(!isOpen)}
                        disabled={isLoading}
                        className={clsx(
                            "flex items-center gap-1 border border-gray-200 dark:border-dark-border rounded px-3 py-1 text-sm bg-white dark:bg-dark-main text-gray-900 dark:text-text-primary transition-colors min-w-[60px] justify-between",
                            isLoading ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500 dark:hover:border-blue-500"
                        )}
                    >
                        <span>{perPage}</span>
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute bottom-full left-0 mb-1 w-full min-w-[80px] bg-white dark:bg-dark-paper border border-gray-200 dark:border-dark-border rounded-lg shadow-lg overflow-hidden z-10"
                            >
                                {pageSizeOptions.map((size) => (
                                    <div
                                        key={size}
                                        onClick={() => {
                                            onPerPageChange(size);
                                            setIsOpen(false);
                                        }}
                                        className={clsx(
                                            "px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
                                            size === perPage && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                        )}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bagian Kanan: Info & Navigasi */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-text-secondary">
                <span>
                    {startItem} - {startItem > 0 ? endItem : 0} of {totalItems}
                </span>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page <= 1 || isLoading}
                    >
                        <ChevronLeft size={18} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages || isLoading}
                    >
                        <ChevronRight size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
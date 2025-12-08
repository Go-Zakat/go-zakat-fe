'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

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

    return (
        <div className="px-6 py-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between bg-white dark:bg-dark-paper">
            {/* Bagian Kiri: Rows Per Page */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-text-secondary">
                <span>Rows per page:</span>
                <select
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                    disabled={isLoading}
                    className="border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer bg-white dark:bg-dark-main text-gray-900 dark:text-text-primary disabled:opacity-50"
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            {/* Bagian Kanan: Info & Navigasi */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-text-secondary">
                <span>
                    {startItem} - {endItem} of {totalItems}
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
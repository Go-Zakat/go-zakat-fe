'use client';

import React from 'react';
import { motion } from "framer-motion";

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
    keyExtractor: (item: T) => string | number;
}

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

export const Table = <T,>({
    columns,
    data,
    isLoading = false,
    emptyMessage = 'Tidak ada data',
    keyExtractor,
}: TableProps<T>) => {
    return (
        <div>
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-dark-main/50 border-y border-gray-100 dark:border-dark-border">
                        {/* Checkbox Header */}
                        <th className="px-6 py-4 w-12 text-center">
                            <input type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-primary-blue focus:ring-primary-blue cursor-pointer bg-transparent" />
                        </th>

                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider whitespace-nowrap ${col.headerClassName || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-dark-border bg-white dark:bg-dark-paper">
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length + 1}
                                className="px-6 py-12 text-center text-gray-500 dark:text-text-secondary">
                                Memuat data...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1}
                                className="px-6 py-12 text-center text-gray-500 dark:text-text-secondary">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, i) => (
                            <motion.tr
                                key={keyExtractor(item)}
                                className="hover:bg-gray-50/50 dark:hover:bg-dark-main/50"

                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.2, delay: i * 0.05 }}
                            >
                                {/* Checkbox Cell */}
                                <td className="px-6 py-4 text-center">
                                    <input type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-primary-blue focus:ring-primary-blue cursor-pointer bg-transparent" />
                                </td>

                                {columns.map((col, index) => (
                                    <td key={index} className={`px-6 py-4 ${col.className || ''}`}>
                                        {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey]) : null)}
                                    </td>
                                ))}
                            </motion.tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
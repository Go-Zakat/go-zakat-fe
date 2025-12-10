'use client';

import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { clsx } from 'clsx';

interface TextareaProps {
    label?: string;
    placeholder?: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    rows?: number;
    className?: string;
}

export function Textarea({
    label,
    placeholder,
    registration,
    error,
    rows = 4,
    className = '',
}: TextareaProps) {
    return (
        <div className={clsx('space-y-2', className)}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <textarea
                rows={rows}
                placeholder={placeholder}
                className={clsx(
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white dark:bg-dark-paper text-gray-900 dark:text-white',
                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                )}
                {...registration}
            />
            {error && error.message && (
                <p className="text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
}
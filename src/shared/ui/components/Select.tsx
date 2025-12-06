'use client';

import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Option[];
    registration?: UseFormRegisterReturn;
    error?: FieldError;
    startIcon?: React.ReactNode;
}

export const Select = ({
    label,
    options,
    registration,
    error,
    className = '',
    startIcon,
    ...props
}: SelectProps) => {
    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={registration?.name || props.id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {startIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        {startIcon}
                    </div>
                )}
                <select
                    id={registration?.name || props.id}
                    {...(registration || {})}
                    className={`w-full py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-paper text-gray-900 dark:text-white appearance-none ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                        } ${startIcon ? 'pl-10' : 'px-4'} pr-8`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
        </div>
    );
};

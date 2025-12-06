'use client';

import { useState } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    registration?: UseFormRegisterReturn;
    error?: FieldError;
    startIcon?: React.ReactNode;
}

export const Input = ({
    label,
    registration,
    error,
    type = 'text',
    className = '',
    startIcon,
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
                <input
                    id={registration?.name || props.id}
                    type={inputType}
                    {...(registration || {})}
                    className={`w-full py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-dark-paper text-gray-900 dark:text-white ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                        } ${startIcon ? 'pl-10' : 'px-4'} ${isPassword ? 'pr-10' : 'pr-4'}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500">{error.message}</p>
            )}
        </div>
    );
};

'use client';

import { useState } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

export const Input = ({
    label,
    registration,
    error,
    type = 'text',
    className = '',
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={className}>
            <label
                htmlFor={registration.name}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={registration.name}
                    type={inputType}
                    {...registration}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${error ? 'border-red-500' : 'border-gray-300'
                        } ${isPassword ? 'pr-10' : ''}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
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

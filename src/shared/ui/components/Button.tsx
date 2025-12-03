import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    isLoading?: boolean;
    fullWidth?: boolean;
    children: ReactNode;
}

export const Button = ({
    variant = 'primary',
    isLoading = false,
    fullWidth = false,
    children,
    className = 'cursor-pointer',
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-blue-600/80 hover:bg-blue-700/80 text-white focus:ring-blue-500',
        outline: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const paddingClass = 'py-2.5 px-4';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${paddingClass} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? 'Memproses...' : children}
        </button>
    );
};

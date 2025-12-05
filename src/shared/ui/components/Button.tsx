import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    fullWidth?: boolean;
    children: ReactNode;
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = 'cursor-pointer font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-blue-600/80 hover:bg-blue-700/80 text-white focus:ring-blue-500',
        outline: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    };

    const sizes = {
        sm: 'py-1.5 px-3 text-xs',
        md: 'py-2.5 px-4 text-sm',
        lg: 'py-3 px-6 text-base',
        icon: 'p-2',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? 'Memproses...' : children}
        </button>
    );
};

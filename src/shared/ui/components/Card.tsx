import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`w-full p-8 space-y-6 bg-white dark:bg-dark-paper rounded-lg border border-gray-200 dark:border-dark-border ${className}`}>
            {children}
        </div>
    );
};

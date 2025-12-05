import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`w-full max-w-md p-8 space-y-6 bg-white rounded-lg border border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

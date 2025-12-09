import { ReactNode } from 'react';
import { Card } from '@/src/shared/ui/components/Card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    trend?: {
        value: number;
        label: string;
        direction: 'up' | 'down';
    };
    colorClass?: string; // e.g. "text-blue-600 bg-blue-50"
}

export const StatCard = ({ title, value, icon, trend, colorClass = "text-blue-600 bg-blue-50" }: StatCardProps) => {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(val);

    return (
        <Card className="p-6 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {formatCurrency(value)}
                    </h3>
                </div>
                <div className={`p-3 rounded-lg ${colorClass}`}>
                    {icon}
                </div>
            </div>

            {trend && (
                <div className="flex items-center gap-2 text-sm">
                    <span className={`flex items-center font-medium ${
                        trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {trend.direction === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        {formatCurrency(trend.value)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                        {trend.label}
                    </span>
                </div>
            )}
        </Card>
    );
};
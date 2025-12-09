import { ReactNode } from 'react';
import { Card } from '@/src/shared/ui/components/Card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface StatItem {
    label: string;
    value: number;
    type: 'income' | 'expense' | 'neutral';
}

interface StatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    stats?: StatItem[];
    colorClass?: string; // e.g. "text-blue-600 bg-blue-50"
}

export const StatCard = ({ title, value, icon, stats, colorClass = "text-blue-600 bg-blue-50" }: StatCardProps) => {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(val);

    const getStatColor = (type: string) => {
        switch (type) {
            case 'income': return 'text-emerald-600 dark:text-emerald-400';
            case 'expense': return 'text-rose-600 dark:text-rose-400';
            default: return 'text-gray-500 dark:text-gray-400';
        }
    };

    const getStatIcon = (type: string) => {
        switch (type) {
            case 'income': return <ArrowUp size={14} className="mr-1" />;
            case 'expense': return <ArrowDown size={14} className="mr-1" />;
            default: return <Minus size={14} className="mr-1" />;
        }
    };

    return (
        <Card className="p-5 flex flex-col justify-between h-full transition-shadow hover:shadow-md bg-white dark:bg-dark-paper border-gray-100 dark:border-dark-border">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`p-1.5 rounded-lg ${colorClass} bg-opacity-10`}>
                            {icon}
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
                {formatCurrency(value)}
            </h3>

            {stats && stats.length > 0 && (
                <div className="space-y-1.5 pt-3">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">
                                {stat.label}
                            </span>
                            <span className={`flex items-center font-semibold ${getStatColor(stat.type)}`}>
                                {getStatIcon(stat.type)}
                                {formatCurrency(stat.value)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};
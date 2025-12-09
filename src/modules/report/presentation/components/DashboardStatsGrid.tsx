'use client';

import { Wallet, Heart, Gift, Archive } from 'lucide-react';
import { useDashboardStatsController } from '../hooks/useDashboardStatsController';
import { StatCard } from './StatCard';

export const DashboardStatsGrid = () => {
    // Panggil Logic dari Controller
    const {
        isLoading,
        zakatBalance,
        fitrahBalance,
        infaqBalance,
        sadaqahBalance
    } = useDashboardStatsController();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-gray-200 dark:bg-dark-border rounded-xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Zakat Maal"
                value={zakatBalance?.balance || 0}
                icon={<Wallet size={24} />}
                colorClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400"
                trend={{
                    value: zakatBalance?.total_in || 0,
                    label: 'Pemasukan',
                    direction: 'up'
                }}
            />
            <StatCard
                title="Zakat Fitrah"
                value={fitrahBalance?.balance || 0}
                icon={<Archive size={24} />}
                colorClass="text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                trend={{
                    value: fitrahBalance?.total_in || 0,
                    label: 'Pemasukan',
                    direction: 'up'
                }}
            />
            <StatCard
                title="Infaq"
                value={infaqBalance?.balance || 0}
                icon={<Gift size={24} />}
                colorClass="text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400"
                trend={{
                    value: infaqBalance?.total_in || 0,
                    label: 'Pemasukan',
                    direction: 'up'
                }}
            />
            <StatCard
                title="Sadaqah"
                value={sadaqahBalance?.balance || 0}
                icon={<Heart size={24} />}
                colorClass="text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400"
                trend={{
                    value: sadaqahBalance?.total_in || 0,
                    label: 'Pemasukan',
                    direction: 'up'
                }}
            />
        </div>
    );
};
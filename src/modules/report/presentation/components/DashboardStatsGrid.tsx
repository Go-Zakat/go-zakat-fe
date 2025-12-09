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
                icon={<Wallet size={16} />}
                colorClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400"
                stats={[
                    { label: 'Pemasukan', value: zakatBalance?.total_in || 0, type: 'income' },
                    { label: 'Pengeluaran', value: zakatBalance?.total_out || 0, type: 'expense' }
                ]}
            />
            <StatCard
                title="Zakat Fitrah"
                value={fitrahBalance?.balance || 0}
                icon={<Archive size={16} />}
                colorClass="text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                stats={[
                    { label: 'Pemasukan', value: fitrahBalance?.total_in || 0, type: 'income' },
                    { label: 'Pengeluaran', value: fitrahBalance?.total_out || 0, type: 'expense' }
                ]}
            />
            <StatCard
                title="Infaq"
                value={infaqBalance?.balance || 0}
                icon={<Gift size={16} />}
                colorClass="text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400"
                stats={[
                    { label: 'Pemasukan', value: infaqBalance?.total_in || 0, type: 'income' },
                    { label: 'Pengeluaran', value: infaqBalance?.total_out || 0, type: 'expense' }
                ]}
            />
            <StatCard
                title="Sadaqah"
                value={sadaqahBalance?.balance || 0}
                icon={<Heart size={16} />}
                colorClass="text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400"
                stats={[
                    { label: 'Pemasukan', value: sadaqahBalance?.total_in || 0, type: 'income' },
                    { label: 'Pengeluaran', value: sadaqahBalance?.total_out || 0, type: 'expense' }
                ]}
            />
        </div>
    );
};
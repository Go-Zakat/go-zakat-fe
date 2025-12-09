'use client';

import { Suspense } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { AnimatedContainer } from "@/src/shared/ui/components/AnimatedContainer";
import { DashboardStatsGrid } from '@/src/modules/report/presentation/components/DashboardStatsGrid';
import { IncomeTrendChart } from '@/src/modules/report/presentation/components/IncomeTrendChart';
import { DistributionChart } from '@/src/modules/report/presentation/components/DistributionChart';
import { useDashboardTokenHandler } from '@/src/modules/auth/presentation/hooks/useDashboardTokenHandler';

function DashboardContent() {

    // Handler Token
    useDashboardTokenHandler();

    return (
        <AnimatedContainer className="space-y-6">
            {/* Header Halaman */}
            <PageHeader
                title="Dashboard Overview"
                breadcrumbs={[{ label: 'Dashboard' }]}
            />

            {/* Bagian 1: Ringkasan Saldo (Kartu Atas) */}
            <section aria-label="Ringkasan Saldo Dana">
                <DashboardStatsGrid />
            </section>

            {/* Bagian 2: Grafik Statistik (Baris Bawah) */}
            <section
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                aria-label="Grafik Statistik"
            >
                {/* Grafik Tren Pemasukan (Lebar 2/3 pada layar besar) */}
                <div className="lg:col-span-2">
                    <IncomeTrendChart />
                </div>

                {/* Grafik Proporsi Penyaluran (Lebar 1/3 pada layar besar) */}
                <div className="lg:col-span-1">
                    <DistributionChart />
                </div>
            </section>
        </AnimatedContainer>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="p-6 text-gray-500">Memuat Dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
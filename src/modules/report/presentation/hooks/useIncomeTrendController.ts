'use client';

import { useEffect, useMemo } from 'react';
import { useIncomeSummary } from '../../application/useIncomeSummary';
import { IncomeSummaryItem } from '@/src/shared/types/common.types';

export const useIncomeTrendController = () => {
    const { getIncomeSummary, data: rawData, isLoading } = useIncomeSummary();

    useEffect(() => {
        const currentYear = new Date().getFullYear();

        // Fetch data untuk satu tahun penuh (1 Jan - 31 Des)
        void getIncomeSummary({
            group_by: 'monthly',
            date_from: `${currentYear}-01-01`,
            date_to: `${currentYear}-12-31`
        });
    }, [getIncomeSummary]);

    // Data Processing: Mengisi bulan yang kosong agar grafik selalu menampilkan Jan-Des
    const processedData = useMemo(() => {
        if (!rawData) return [];

        const currentYear = new Date().getFullYear();
        const filledData: IncomeSummaryItem[] = [];

        // Loop 0-11 (Januari - Desember)
        for (let i = 0; i < 12; i++) {
            // Format: "YYYY-MM" (misal: "2025-01")
            const monthStr = `${currentYear}-${String(i + 1).padStart(2, '0')}`;

            // Cari data dari API yang cocok dengan bulan ini
            const existingData = rawData.find(item => item.period === monthStr);

            if (existingData) {
                filledData.push(existingData);
            } else {
                // Jika tidak ada data, buat data dummy dengan nilai 0
                filledData.push({
                    period: monthStr,
                    zakat_fitrah: 0,
                    zakat_maal: 0,
                    infaq: 0,
                    sadaqah: 0,
                    total: 0
                });
            }
        }
        return filledData;
    }, [rawData]);

    // Formatter untuk Sumbu Y (Rp)
    const formatYAxis = (tick: number) => {
        if (tick === 0) return '';
        if (tick >= 1000000000) return `${(tick / 1000000000).toFixed(1)}M`;
        if (tick >= 1000000) return `${(tick / 1000000).toFixed(0)}Jt`;
        if (tick >= 1000) return `${(tick / 1000).toFixed(0)}Rb`;
        return tick.toString();
    };

    // Formatter untuk Sumbu X (Nama Bulan)
    const formatXAxis = (period: string) => {
        const date = new Date(`${period}-01`);
        return date.toLocaleDateString('id-ID', { month: 'short' }); // "Jan", "Feb"
    };

    return {
        data: processedData,
        isLoading,
        formatYAxis,
        formatXAxis
    };
};
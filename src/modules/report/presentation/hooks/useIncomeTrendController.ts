'use client';

import { useEffect } from 'react';
import { useIncomeSummary } from '../../application/useIncomeSummary';

export const useIncomeTrendController = () => {
    const { getIncomeSummary, data, isLoading } = useIncomeSummary();

    useEffect(() => {
        // Logic default filter bisa dikembangkan di sini (misal filter tahun)
        void getIncomeSummary({ group_by: 'monthly' });
    }, [getIncomeSummary]);

    // Logic formatting helper juga bisa ditaruh di sini jika kompleks
    const formatYAxis = (tick: number) => {
        if (tick >= 1000000) return `${(tick / 1000000).toFixed(0)}Jt`;
        if (tick >= 1000) return `${(tick / 1000).toFixed(0)}Rb`;
        return tick.toString();
    };

    return {
        data,
        isLoading,
        formatYAxis
    };
};
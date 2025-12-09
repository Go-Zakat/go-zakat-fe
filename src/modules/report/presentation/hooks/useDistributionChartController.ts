'use client';

import { useEffect } from 'react';
import { useDistributionSummary } from '../../application/useDistributionSummary';

export const useDistributionChartController = () => {
    const { getDistributionSummary, data, isLoading } = useDistributionSummary();

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    useEffect(() => {
        void getDistributionSummary({ group_by: 'program' });
    }, [getDistributionSummary]);

    return {
        data,
        isLoading,
        COLORS
    };
};
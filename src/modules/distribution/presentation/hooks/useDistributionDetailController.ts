'use client';

import { useEffect } from 'react';
import { useDistributionDetail } from '../../application/useDistributionDetail';

export const useDistributionDetailController = (id: string) => {
    const { getDistributionById, data: distribution, isLoading, error } = useDistributionDetail();

    useEffect(() => {
        if (id) {
            void getDistributionById(id);
        }
    }, [id, getDistributionById]);

    return {
        distribution,
        isLoading,
        error
    };
};
'use client';

import { useEffect } from 'react';
import { useMustahiqDetail } from '../../application/useMustahiqDetail';

export const useMustahiqDetailController = (id: string) => {
    const { data: mustahiq, isLoading, error, getMustahiqById } = useMustahiqDetail();

    useEffect(() => {
        if (id) {
            getMustahiqById(id);
        }
    }, [id]);

    return {
        mustahiq,
        isLoading,
        error,
    };
};

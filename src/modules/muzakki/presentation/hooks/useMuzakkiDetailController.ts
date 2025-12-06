'use client';

import { useEffect } from 'react';
import { useMuzakkiDetail } from '../../application/useMuzakkiDetail';

export const useMuzakkiDetailController = (id: string) => {
    const { data: muzakki, isLoading, error, getMuzakkiById } = useMuzakkiDetail();

    useEffect(() => {
        if (id) {
            getMuzakkiById(id);
        }
    }, [id]);

    return {
        muzakki,
        isLoading,
        error,
    };
};

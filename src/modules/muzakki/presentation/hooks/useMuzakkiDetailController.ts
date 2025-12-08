'use client';

import { useEffect } from 'react';
import { useMuzakkiDetail } from '../../application/useMuzakkiDetail';

export const useMuzakkiDetailController = (id: string) => {
    const { data: muzakki, isLoading, error, getMuzakkiById } = useMuzakkiDetail();

    useEffect(() => {
        if (id) {
            // Void & Dependency
            void getMuzakkiById(id);
        }
    }, [id, getMuzakkiById]);

    return {
        muzakki,
        isLoading,
        error,
    };
};
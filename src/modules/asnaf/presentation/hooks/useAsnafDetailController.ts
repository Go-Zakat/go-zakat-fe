'use client';

import { useEffect } from 'react';
import { useAsnafDetail } from '../../application/useAsnafDetail';

export const useAsnafDetailController = (id: string) => {
    const { data: asnaf, isLoading, error, getAsnafById } = useAsnafDetail();

    useEffect(() => {
        if (id) {
            getAsnafById(id);
        }
    }, [id]);

    return {
        asnaf,
        isLoading,
        error,
    };
};

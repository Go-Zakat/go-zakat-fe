'use client';

import { useEffect } from 'react';
import { useAsnafDetail } from '../../application/useAsnafDetail';

export const useAsnafDetailController = (id: string) => {
    const { data: asnaf, isLoading, error, getAsnafById } = useAsnafDetail();

    useEffect(() => {
        if (id) {
            void getAsnafById(id);
        }
    }, [id, getAsnafById]);

    return {
        asnaf,
        isLoading,
        error,
    };
};
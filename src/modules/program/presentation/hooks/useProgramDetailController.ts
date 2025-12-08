'use client';

import { useEffect } from 'react';
import { useProgramDetail } from '../../application/useProgramDetail';

export const useProgramDetailController = (id: string) => {
    const { data: program, isLoading, error, getProgramById } = useProgramDetail();

    useEffect(() => {
        if (id) {
            // Void & Dependency
            void getProgramById(id);
        }
    }, [id, getProgramById]);

    return {
        program,
        isLoading,
        error,
    };
};
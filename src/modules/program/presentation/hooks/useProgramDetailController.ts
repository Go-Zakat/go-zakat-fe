'use client';

import { useEffect } from 'react';
import { useProgramDetail } from '../../application/useProgramDetail';

export const useProgramDetailController = (id: string) => {
    const { data: program, isLoading, error, getProgramById } = useProgramDetail();

    useEffect(() => {
        if (id) {
            getProgramById(id);
        }
    }, [id]);

    return {
        program,
        isLoading,
        error,
    };
};

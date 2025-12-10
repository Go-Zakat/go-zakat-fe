'use client';

import { useState, useCallback } from 'react';
import { userApi } from '../infrastructure/user.api';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { User } from "@/src/shared/types/common.types";

export const useUserDetail = () => {
    const [data, setData] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUserById = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);

        try {
            const res = await userApi.getById(id);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getUserById,
        data,
        isLoading,
        error,
    };
};
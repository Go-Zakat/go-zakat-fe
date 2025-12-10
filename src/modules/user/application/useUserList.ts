'use client';

import { useState, useCallback } from 'react';
import { userApi, GetUserListParams } from '../infrastructure/user.api';
import { PaginatedData } from '@/src/shared/types/pagination.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';
import { User } from "@/src/shared/types/common.types";

export const useUserList = () => {
    const [data, setData] = useState<PaginatedData<User> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUserList = useCallback(async (params?: GetUserListParams) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await userApi.getList(params);
            setData(res.data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getUserList,
        data,
        items: data?.items ?? [],
        meta: data?.meta,
        isLoading,
        error,
    };
};
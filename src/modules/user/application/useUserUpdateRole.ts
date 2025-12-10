'use client';

import { useState, useCallback } from 'react';
import { userApi } from '../infrastructure/user.api';
import { UpdateRoleRequest } from '../domain/user.types';
import { extractErrorMessage } from '@/src/shared/api/errorHandler';

export const useUserUpdateRole = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUserRole = useCallback(async (id: string, payload: UpdateRoleRequest) => {
        if (!id) return false;
        setIsLoading(true);
        setError(null);

        try {
            await userApi.updateRole(id, payload);
            return true;
        } catch (err) {
            setError(extractErrorMessage(err));
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        updateUserRole,
        isLoading,
        error,
    };
};
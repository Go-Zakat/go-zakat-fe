import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import { LoginRequest, RegisterRequest, AuthResponseWrapper } from '../domain/auth.types';

/**
 * Auth API
 * Semua API calls untuk authentication
 */
export const authApi = {
    /**
     * Login
     * Login dengan email dan password
     */
    login: async (data: LoginRequest): Promise<AuthResponseWrapper> => {
        const response = await httpClient.post<AuthResponseWrapper>(
            ENDPOINTS.AUTH.LOGIN,
            data
        );
        return response.data;
    },

    /**
     * Register
     * Register user baru
     */
    register: async (data: RegisterRequest): Promise<AuthResponseWrapper> => {
        const response = await httpClient.post<AuthResponseWrapper>(
            ENDPOINTS.AUTH.REGISTER,
            data
        );
        return response.data;
    },

    /**
     * Get Me
     * Mendapatkan data user yang sedang login
     */
    getMe: async (): Promise<AuthResponseWrapper> => {
        const response = await httpClient.get<AuthResponseWrapper>(
            ENDPOINTS.AUTH.ME
        );
        return response.data;
    },
};

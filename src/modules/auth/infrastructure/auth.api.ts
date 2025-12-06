import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    LoginRequest,
    RegisterRequest,
    AuthResponseWrapper,
    GoogleLoginResponse,
} from '../domain/auth.types';

/**
 * Auth API
 * Semua API calls untuk authentication
 */
export const authApi = {
    /**
     * Login
     * Login dengan email dan password
     * POST /api/v1/auth/login
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
     * POST /api/v1/auth/register
     */
    register: async (data: RegisterRequest): Promise<AuthResponseWrapper> => {
        const response = await httpClient.post<AuthResponseWrapper>(
            ENDPOINTS.AUTH.REGISTER,
            data
        );
        return response.data;
    },

    /**
     * Get Google Login URL
     * Mendapatkan URL untuk login dengan Google
     * GET /api/v1/auth/google/url
     */
    getGoogleLoginUrl: async (): Promise<GoogleLoginResponse> => {
        const response = await httpClient.get<GoogleLoginResponse>(
            ENDPOINTS.AUTH.GOOGLE_LOGIN
        );
        return response.data;
    },
};

// src/shared/api/httpClient.ts
import axios from 'axios';
import { env } from '../config/env';
import { STORAGE_KEYS } from '../config/constants';

/** Helper to get access token */
const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const httpClient = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000,
});

// Attach token to each request
httpClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Shared promise to avoid duplicate refreshes
let refreshPromise: Promise<string> | null = null;

httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        // Handle 401 errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            // If refresh endpoint itself fails, logout
            if (originalRequest.url?.includes('/auth/refresh')) {
                if (typeof window !== 'undefined') {
                    const { authStorage } = await import('../lib/authStorage');
                    authStorage.clearTokens();
                    if (!window.location.pathname.includes('/login')) window.location.href = '/login';
                }
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (!refreshPromise) {
                const { authStorage } = await import('../lib/authStorage');
                const refreshToken = authStorage.getRefreshToken();
                if (!refreshToken) {
                    authStorage.clearTokens();
                    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                        window.location.href = '/login';
                    }
                    return Promise.reject(error);
                }
                refreshPromise = axios
                    .post(`${env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, { refresh_token: refreshToken })
                    .then(async (res) => {
                        const { access_token, refresh_token: newRefresh } = res.data.data;
                        const { authStorage } = await import('../lib/authStorage');
                        authStorage.setTokens({ accessToken: access_token, refreshToken: newRefresh });
                        return access_token;
                    })
                    .catch((refreshError) => {
                        const { authStorage } = await import('../lib/authStorage');
                        authStorage.clearTokens();
                        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                            window.location.href = '/login';
                        }
                        throw refreshError;
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            try {
                const newAccess = await refreshPromise;
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return httpClient(originalRequest);
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
);

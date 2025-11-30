import axios from 'axios';
import { env } from '../config/env';
import { STORAGE_KEYS } from '../config/constants';

/**
 * Helper function untuk get access token dari cookies (server-side compatible)
 * Di client side, token akan diambil dari localStorage
 */
const getAccessToken = (): string | null => {
    if (typeof window === 'undefined') {
        // Server-side: tidak bisa akses localStorage
        return null;
    }

    // Client-side: ambil dari localStorage
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * HTTP Client
 * Instance Axios yang sudah dikonfigurasi dengan base URL dan interceptors
 */
export const httpClient = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 detik timeout
});

// ============================================================
// REQUEST INTERCEPTOR
// Inject token ke setiap request
// ============================================================
httpClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        // Jika ada token, tambahkan ke header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ============================================================
// RESPONSE INTERCEPTOR
// Handle error responses dan auto refresh token
// ============================================================

// Flag untuk mencegah multiple refresh token requests bersamaan
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

/**
 * Process Queue
 * Memproses semua request yang tertunda setelah refresh token selesai
 */
const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

httpClient.interceptors.response.use(
    (response) => {
        // Response sukses, langsung return
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Jika error 401 (Unauthorized) dan belum pernah retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Jika request yang gagal adalah refresh token itu sendiri, langsung logout
            if (originalRequest.url?.includes('/auth/refresh')) {
                if (typeof window !== 'undefined') {
                    // Import authStorage untuk clear tokens
                    const { authStorage } = await import('../lib/authStorage');
                    authStorage.clearTokens();

                    // Redirect ke login
                    if (!window.location.pathname.includes('/login')) {
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error);
            }

            // Jika sedang refresh, tambahkan request ke queue
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return httpClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            // Coba refresh token
            try {
                if (typeof window === 'undefined') {
                    throw new Error('Cannot refresh token on server side');
                }

                // Ambil refresh token dari localStorage
                const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Request refresh token ke backend
                const response = await axios.post(
                    `${env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
                    { refresh_token: refreshToken }
                );

                const { access_token, refresh_token: newRefreshToken } =
                    response.data.data;

                // Simpan token baru
                const { authStorage } = await import('../lib/authStorage');
                authStorage.setAccessToken(access_token);
                if (newRefreshToken) {
                    authStorage.setRefreshToken(newRefreshToken);
                }

                // Update header untuk original request
                originalRequest.headers.Authorization = `Bearer ${access_token}`;

                // Process queue dengan token baru
                processQueue(null, access_token);

                // Retry original request dengan token baru
                return httpClient(originalRequest);
            } catch (refreshError) {
                // Refresh token gagal, clear tokens dan redirect
                processQueue(refreshError, null);

                if (typeof window !== 'undefined') {
                    const { authStorage } = await import('../lib/authStorage');
                    authStorage.clearTokens();

                    // Redirect ke login jika tidak sedang di halaman login
                    if (!window.location.pathname.includes('/login')) {
                        window.location.href = '/login';
                    }
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Return error untuk di-handle oleh caller
        return Promise.reject(error);
    }
);

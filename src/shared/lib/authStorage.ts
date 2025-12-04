import Cookies from 'js-cookie';
import { STORAGE_KEYS } from '../config/constants';

export interface StoredUser {
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
}

/**
 * Auth Storage
 * Utility untuk mengelola authentication tokens dan user data
 * Tokens disimpan di localStorage DAN cookies (agar bisa diakses oleh middleware)
 */
export const authStorage = {
    /**
     * Get Access Token
     * Mengambil access token dari localStorage
     */
    getAccessToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    },

    /**
     * Set Access Token
     * Menyimpan access token ke localStorage dan cookies
     * @param token - JWT access token
     */
    setAccessToken: (token: string): void => {
        if (typeof window === 'undefined') return;

        // Simpan ke localStorage
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);

        // Simpan ke cookies (expires 1 hari)
        // Cookies dibutuhkan agar middleware bisa membaca token
        Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, token, {
            expires: 1, // 1 hari
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Hanya HTTPS di production
        });
    },

    /**
     * Get Refresh Token
     * Mengambil refresh token dari localStorage
     */
    getRefreshToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    },

    /**
     * Set Refresh Token
     * Menyimpan refresh token ke localStorage dan cookies
     * @param token - JWT refresh token
     */
    setRefreshToken: (token: string): void => {
        if (typeof window === 'undefined') return;

        // Simpan ke localStorage
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);

        // Simpan ke cookies (expires 7 hari)
        Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, token, {
            expires: 7, // 7 hari
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
    },

    // New helper to set both tokens atomically
    setTokens: ({ accessToken, refreshToken }: { accessToken: string; refreshToken?: string }) => {
        // Update access token
        authStorage.setAccessToken(accessToken);
        // Update refresh token if provided
        if (refreshToken) {
            authStorage.setRefreshToken(refreshToken);
        }
    },

    /**
     * Get User
     * Mengambil data user dari localStorage
     */
    getUser: (): StoredUser | null => {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    /**
     * Set User
     * Menyimpan data user ke localStorage
     */
    setUser: (user: StoredUser): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },

    /**
     * Clear Tokens & User
     * Menghapus semua tokens dan data user dari localStorage dan cookies
     * Biasanya dipanggil saat logout atau token expired
     */
    clearTokens: (): void => {
        if (typeof window === 'undefined') return;

        // Hapus dari localStorage
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);

        // Hapus dari cookies
        Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
        Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
    },

    /**
     * Has Token
     * Cek apakah user sudah punya access token
     * @returns true jika ada access token
     */
    hasToken: (): boolean => {
        return !!authStorage.getAccessToken();
    },
};

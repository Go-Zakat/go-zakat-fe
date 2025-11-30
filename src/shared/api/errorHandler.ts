import axios, { AxiosError } from 'axios';

/**
 * Extract Error Message
 * Mengambil pesan error yang user-friendly dari Axios error
 */
export const extractErrorMessage = (error: unknown): string => {
    // Pastikan error adalah AxiosError
    if (!axios.isAxiosError(error)) {
        return 'Terjadi kesalahan yang tidak diketahui';
    }

    const axiosError = error as AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
    }>;

    // Jika ada response dari server
    if (axiosError.response) {
        const { data, status } = axiosError.response;

        // Jika ada pesan error dari server
        if (data?.message) {
            return data.message;
        }

        // Jika ada validation errors
        if (data?.errors) {
            const firstError = Object.values(data.errors)[0];
            if (firstError && firstError.length > 0) {
                return firstError[0];
            }
        }

        // Pesan berdasarkan status code
        switch (status) {
            case 400:
                return 'Permintaan tidak valid';
            case 401:
                return 'Anda harus login terlebih dahulu';
            case 403:
                return 'Anda tidak memiliki akses';
            case 404:
                return 'Data tidak ditemukan';
            case 422:
                return 'Data yang Anda masukkan tidak valid';
            case 500:
                return 'Terjadi kesalahan di server';
            default:
                return `Terjadi kesalahan (${status})`;
        }
    }

    // Jika request dibuat tapi tidak ada response (network error)
    if (axiosError.request) {
        return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    }

    // Error lainnya
    return axiosError.message || 'Terjadi kesalahan yang tidak diketahui';
};

/**
 * Get Validation Errors
 * Mengambil semua validation errors dari response
 */
export const getValidationErrors = (
    error: unknown
): Record<string, string[]> | null => {
    if (!axios.isAxiosError(error)) {
        return null;
    }

    const axiosError = error as AxiosError<{
        errors?: Record<string, string[]>;
    }>;

    return axiosError.response?.data?.errors || null;
};

// ============================================================
// GENERIC API RESPONSE WRAPPERS
// Wrapper untuk semua response dari API
// ============================================================

import { PaginationMeta } from './pagination.types';

/**
 * Success Response Wrapper
 * Digunakan untuk response yang berhasil dengan data single
 */
export interface ApiSuccessResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

/**
 * Error Response Wrapper
 * Digunakan untuk response yang error
 */
export interface ApiErrorResponse {
    message: string;
    success: boolean; // false
    errors?: Record<string, string[]>; // Untuk validation errors
}

/**
 * List Response Wrapper
 * Digunakan untuk response list dengan pagination
 */
export interface ApiListResponse<T> {
    data: {
        items: T[];
        meta: PaginationMeta;
    };
    message: string;
    success: boolean;
}

/**
 * Empty Success Response
 * Digunakan untuk response sukses tanpa data (misal: delete)
 */
export interface ApiEmptySuccessResponse {
    message: string;
    success: boolean;
}

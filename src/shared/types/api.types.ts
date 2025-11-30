// ============================================================
// GENERIC API RESPONSE WRAPPERS
// Wrapper untuk semua response dari API
// ============================================================

/**
 * Success Response Wrapper
 * Digunakan untuk response yang berhasil dengan data
 */
export interface ApiSuccessResponse<T> {
    data: T;
    message: string;
    status: number;
}

/**
 * Error Response Wrapper
 * Digunakan untuk response yang error
 */
export interface ApiErrorResponse {
    message: string;
    status: number;
    errors?: Record<string, string[]>; // Untuk validation errors
}

/**
 * List Response Wrapper
 * Digunakan untuk response list dengan pagination
 */
export interface ApiListResponse<T> {
    data: T[];
    message: string;
    status: number;
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}

/**
 * Empty Success Response
 * Digunakan untuk response sukses tanpa data (misal: delete)
 */
export interface ApiEmptySuccessResponse {
    message: string;
    status: number;
}

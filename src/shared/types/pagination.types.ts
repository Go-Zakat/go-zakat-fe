// ============================================================
// PAGINATION TYPES
// Types untuk pagination request dan response
// ============================================================

/**
 * Pagination Request
 * Parameter untuk request list dengan pagination
 */
export interface PaginationRequest {
    page?: number;
    per_page?: number;
    q?: string; // Search query
}

/**
 * Pagination Meta
 * Metadata pagination dari response
 */
export interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

/**
 * Paginated Response
 * Generic type untuk response list dengan pagination
 */
export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

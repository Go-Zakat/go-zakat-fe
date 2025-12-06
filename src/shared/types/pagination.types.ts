// ============================================================
// PAGINATION TYPES
// Types untuk pagination request dan response
// ============================================================

/**
 * Pagination Meta
 * Metadata pagination dari response
 */
export interface PaginationMeta {
    page: number;
    per_page: number;
    total: number;
    total_page: number;
}

/**
 * Paginated Response Data
 * Generic type untuk field 'data' pada response list
 */
export interface PaginatedData<T> {
    items: T[];
    meta: PaginationMeta;
}

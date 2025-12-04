import { z } from 'zod';

// ============================================================
// ASNAF TYPES
// ============================================================

/**
 * Asnaf Schema
 * Validasi untuk form create / update Asnaf
 */
export const asnafSchema = z.object({
    name: z
        .string()
        .min(1, 'Nama asnaf wajib diisi')
        .max(100, 'Nama asnaf maksimal 100 karakter'),
    description: z
        .string()
        .max(255, 'Deskripsi maksimal 255 karakter')
        .optional()
        .or(z.literal('')),
});

/**
 * Nilai form Asnaf (create / update)
 */
export type AsnafFormValues = z.infer<typeof asnafSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

/**
 * Create Asnaf Request
 * Body untuk POST /api/v1/asnaf
 */
export interface CreateAsnafRequest {
    name: string;
    description?: string;
}

/**
 * Update Asnaf Request
 * Body untuk PUT /api/v1/asnaf/{id}
 */
export interface UpdateAsnafRequest {
    name: string;
    description?: string;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * Asnaf Type
 * Data Asnaf dari API
 *
 * Sesuai dto.AsnafResponse di swagger:
 * - id: string
 * - name: string
 * - description?: string
 * - createdAt: string
 * - updatedAt: string
 */
export interface Asnaf {
    id: string;
    name: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Meta Pagination
 * Sesuai dto.MetaResponse
 */
export interface MetaResponse {
    page: number;
    per_page: number;
    total: number;
    total_page: number;
}

/**
 * Asnaf List Data
 * Bentuk data di wrapper list (items + meta)
 */
export interface AsnafListData {
    items: Asnaf[];
    meta: MetaResponse;
}

/**
 * Asnaf List Response Wrapper
 * Wrapper untuk GET /api/v1/asnaf
 * (swagger: dto.AsnafListResponseWrapper)
 */
export interface AsnafListResponseWrapper {
    data: AsnafListData;
    message: string;
    success: boolean;
}

/**
 * Asnaf Detail Response Wrapper
 * Wrapper untuk GET /api/v1/asnaf/{id}
 * (swagger: dto.AsnafResponseWrapper)
 */
export interface AsnafResponseWrapper {
    data: Asnaf;
    message: string;
    success: boolean;
}
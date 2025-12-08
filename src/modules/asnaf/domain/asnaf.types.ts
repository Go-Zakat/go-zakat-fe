import { z } from 'zod';
import { Asnaf } from '@/src/shared/types/common.types';
import {
    ApiListResponse,
    ApiSuccessResponse,
    ApiEmptySuccessResponse,
} from '@/src/shared/types/api.types';

// ============================================================
// ASNAF SCHEMA & FORM VALUES
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
 * Tipe data untuk Form Values (Inferred from Zod)
 */
export type AsnafFormValues = z.infer<typeof asnafSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

/**
 * Create/Update Asnaf Request
 * Payload untuk endpoint POST dan PUT
 */
export interface AsnafRequest {
    name: string;
    description?: string;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * Asnaf List Response Wrapper
 * GET /api/v1/asnaf
 */
export type AsnafListResponseWrapper = ApiListResponse<Asnaf>;

/**
 * Asnaf Detail/Create/Update Response Wrapper
 * GET/POST/PUT /api/v1/asnaf/{id}
 */
export type AsnafResponseWrapper = ApiSuccessResponse<Asnaf>;

/**
 * Asnaf Delete Response Wrapper
 * DELETE /api/v1/asnaf/{id}
 */
export type AsnafDeleteResponseWrapper = ApiEmptySuccessResponse;
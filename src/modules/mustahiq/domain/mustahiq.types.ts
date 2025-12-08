import { z } from 'zod';
import { Mustahiq } from '@/src/shared/types/common.types';
import {
    ApiListResponse,
    ApiSuccessResponse,
    ApiEmptySuccessResponse,
} from '@/src/shared/types/api.types';
import { MUSTAHIQ_STATUS } from '@/src/shared/config/constants';

// ============================================================
// MUSTAHIQ SCHEMA & FORM VALUES
// ============================================================

/**
 * Mustahiq Schema
 * Validasi untuk form create / update Mustahiq
 */
export const mustahiqSchema = z.object({
    name: z
        .string()
        .min(1, 'Nama mustahiq wajib diisi')
        .max(100, 'Nama mustahiq maksimal 100 karakter'),

    address: z
        .string()
        .min(1, 'Alamat wajib diisi')
        .max(255, 'Alamat maksimal 255 karakter'),

    phoneNumber: z
        .string()
        .min(1, 'Nomor telepon wajib diisi')
        .max(20, 'Nomor telepon maksimal 20 karakter'),

    asnafID: z
        .string()
        .min(1, 'Asnaf wajib dipilih'),

    status: z
        .enum([MUSTAHIQ_STATUS.ACTIVE, MUSTAHIQ_STATUS.INACTIVE, MUSTAHIQ_STATUS.PENDING])
        .default(MUSTAHIQ_STATUS.ACTIVE),

    description: z
        .string()
        .max(255, 'Deskripsi maksimal 255 karakter')
        .optional()
        .or(z.literal('')),
});

/**
 * Tipe data untuk Form Values (Inferred from Zod)
 */
export type MustahiqFormValues = z.infer<typeof mustahiqSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

/**
 * Create/Update Mustahiq Request
 * Payload untuk endpoint POST dan PUT
 */
export interface MustahiqRequest {
    name: string;
    address: string;
    phoneNumber: string;
    asnafID: string;
    status: string;
    description?: string;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * Mustahiq List Response Wrapper
 * GET /api/v1/mustahiq
 */
export type MustahiqListResponseWrapper = ApiListResponse<Mustahiq>;

/**
 * Mustahiq Detail/Create/Update Response Wrapper
 * GET/POST/PUT /api/v1/mustahiq/{id}
 */
export type MustahiqResponseWrapper = ApiSuccessResponse<Mustahiq>;

/**
 * Mustahiq Delete Response Wrapper
 * DELETE /api/v1/mustahiq/{id}
 */
export type MustahiqDeleteResponseWrapper = ApiEmptySuccessResponse;
import { z } from 'zod';
import { MUSTAHIQ_STATUS, MustahiqStatus } from '@/src/shared/config/constants';
import { Mustahiq } from '@/src/shared/types/common.types';
import {
    ApiListResponse,
    ApiSuccessResponse,
    ApiEmptySuccessResponse,
} from '@/src/shared/types/api.types';

// ============================================================
// MUSTAHIQ TYPES
// ============================================================

/**
 * Mustahiq Schema
 * Validasi untuk form create / update Mustahiq
 */
export const mustahiqSchema = z.object({
    name: z
        .string()
        .min(1, 'Nama lengkap wajib diisi')
        .max(100, 'Nama lengkap maksimal 100 karakter'),
    address: z
        .string()
        .min(1, 'Alamat wajib diisi')
        .max(255, 'Alamat maksimal 255 karakter'),
    phoneNumber: z
        .string()
        .min(1, 'Nomor telepon wajib diisi')
        .max(20, 'Nomor telepon maksimal 20 karakter'),
    asnafID: z.string().min(1, 'Asnaf wajib dipilih'),
    status: z.enum(
        [
            MUSTAHIQ_STATUS.ACTIVE,
            MUSTAHIQ_STATUS.INACTIVE,
            MUSTAHIQ_STATUS.GRADUATED,
        ]
    ),
    description: z
        .string()
        .max(255, 'Deskripsi maksimal 255 karakter')
        .optional()
        .or(z.literal('')),
});

/**
 * Nilai form Mustahiq (create / update)
 */
export type MustahiqFormValues = z.infer<typeof mustahiqSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

/**
 * Create Mustahiq Request
 * Body untuk POST /api/v1/mustahiq
 *
 * Dan
 *
 * Update Mustahiq Request
 * Body untuk PUT /api/v1/mustahiq/{id}
 */
export interface MustahiqRequest {
    name: string;
    address: string;
    phoneNumber: string;
    asnafID: string;
    status: MustahiqStatus;
    description?: string;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * Mustahiq List Response Wrapper
 * Wrapper untuk GET /api/v1/mustahiq
 */
export type MustahiqListResponseWrapper = ApiListResponse<Mustahiq>;

/**
 * Mustahiq Detail/Create/Update Response Wrapper
 * Wrapper untuk GET/POST/PUT /api/v1/mustahiq/{id}
 */
export type MustahiqResponseWrapper = ApiSuccessResponse<Mustahiq>;

/**
 * Mustahiq Delete Response Wrapper
 * Wrapper untuk DELETE /api/v1/mustahiq/{id}
 */
export type MustahiqDeleteResponseWrapper = ApiEmptySuccessResponse;
import { z } from 'zod';
import { Muzakki } from '@/src/shared/types/common.types';
import {
    ApiListResponse,
    ApiSuccessResponse,
    ApiEmptySuccessResponse,
} from '@/src/shared/types/api.types';

// ============================================================
// MUZAKKI TYPES
// ============================================================

/**
 * Muzakki Schema
 * Validasi untuk form create / update Muzakki
 */
export const muzakkiSchema = z.object({
    name: z
        .string()
        .min(1, 'Nama muzakki wajib diisi')
        .max(100, 'Nama muzakki maksimal 100 karakter'),
    phoneNumber: z
        .string()
        .min(1, 'Nomor telepon wajib diisi')
        .max(20, 'Nomor telepon maksimal 20 karakter'),
    address: z
        .string()
        .min(1, 'Alamat wajib diisi'),
    notes: z.string().optional().or(z.literal('')),
});

/**
 * Nilai form Muzakki (create / update)
 */
export type MuzakkiFormValues = z.infer<typeof muzakkiSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

/**
 * Create Muzakki Request
 * Body untuk POST /api/v1/muzakki
 *
 * Dan
 *
 * Update Muzakki Request
 * Body untuk PUT /api/v1/muzakki/{id}
 */
export interface MuzakkiRequest {
    name: string;
    phoneNumber: string;
    address: string;
    notes?: string;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * Muzakki List Response Wrapper
 * Wrapper untuk GET /api/v1/muzakki
 */
export type MuzakkiListResponseWrapper = ApiListResponse<Muzakki>;

/**
 * Muzakki Detail/Create/Update Response Wrapper
 * Wrapper untuk GET/POST/PUT /api/v1/muzakki/{id}
 */
export type MuzakkiResponseWrapper = ApiSuccessResponse<Muzakki>;

/**
 * Muzakki Delete Response Wrapper
 * Wrapper untuk DELETE /api/v1/muzakki/{id}
 */
export type MuzakkiDeleteResponseWrapper = ApiEmptySuccessResponse;

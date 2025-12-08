import { z } from 'zod';
import { Muzakki } from '@/src/shared/types/common.types';
import {
    ApiListResponse,
    ApiSuccessResponse,
    ApiEmptySuccessResponse,
} from '@/src/shared/types/api.types';

// ============================================================
// MUZAKKI SCHEMA & FORM VALUES
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
        .max(20, 'Nomor telepon maksimal 20 karakter'), // Added max validation

    address: z
        .string()
        .min(1, 'Alamat wajib diisi')
        .max(255, 'Alamat maksimal 255 karakter'), // Added max validation

    notes: z
        .string()
        .max(255, 'Catatan maksimal 255 karakter')
        .optional()
        .or(z.literal('')), // Handle string kosong
});

/**
 * Tipe data untuk Form Values (Inferred from Zod)
 */
export type MuzakkiFormValues = z.infer<typeof muzakkiSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

/**
 * Create/Update Muzakki Request
 * Payload untuk endpoint POST dan PUT
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
 * GET /api/v1/muzakki
 */
export type MuzakkiListResponseWrapper = ApiListResponse<Muzakki>;

/**
 * Muzakki Detail/Create/Update Response Wrapper
 * GET/POST/PUT /api/v1/muzakki/{id}
 */
export type MuzakkiResponseWrapper = ApiSuccessResponse<Muzakki>;

/**
 * Muzakki Delete Response Wrapper
 * DELETE /api/v1/muzakki/{id}
 */
export type MuzakkiDeleteResponseWrapper = ApiEmptySuccessResponse;
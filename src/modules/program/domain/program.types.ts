import { z } from 'zod';
import { Program } from '@/src/shared/types/common.types';
import {
    ApiListResponse,
    ApiSuccessResponse,
    ApiEmptySuccessResponse,
} from '@/src/shared/types/api.types';

// ============================================================
// PROGRAM TYPES
// ============================================================

/**
 * Program Schema
 * Validasi untuk form create / update Program
 */
export const programSchema = z.object({
    name: z
        .string()
        .min(1, 'Nama program wajib diisi')
        .max(100, 'Nama program maksimal 100 karakter'),
    description: z
        .string()
        .max(255, 'Deskripsi maksimal 255 karakter')
        .optional()
        .or(z.literal('')),
    type: z
        .string()
        .min(1, 'Tipe program wajib diisi'),
    active: z
        .boolean()
        .default(true),
});

/**
 * Nilai form Program (create / update)
 */
export type ProgramFormValues = z.infer<typeof programSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

/**
 * Create Program Request
 * Body untuk POST /api/v1/programs
 *
 * Dan
 *
 * Update Program Request
 * Body untuk PUT /api/v1/programs/{id}
 */
export interface ProgramRequest {
    name: string;
    description?: string;
    type: string;
    active: boolean;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * Program List Response Wrapper
 * Wrapper untuk GET /api/v1/programs
 */
export type ProgramListResponseWrapper = ApiListResponse<Program>;

/**
 * Program Detail/Create/Update Response Wrapper
 * Wrapper untuk GET/POST/PUT /api/v1/programs/{id}
 */
export type ProgramResponseWrapper = ApiSuccessResponse<Program>;

/**
 * Program Delete Response Wrapper
 * Wrapper untuk DELETE /api/v1/programs/{id}
 */
export type ProgramDeleteResponseWrapper = ApiEmptySuccessResponse;

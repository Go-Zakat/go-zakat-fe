import { z } from 'zod';
import {
    ApiListResponse,
    ApiSuccessResponse,
    ApiEmptySuccessResponse,
} from '@/src/shared/types/api.types';
import { Distribution } from '@/src/shared/types/common.types';

// ============================================================
// DISTRIBUTION SCHEMA & FORM VALUES
// ============================================================

/**
 * Distribution Item Schema
 * Validasi untuk setiap baris penerima (Mustahiq)
 */
export const distributionItemSchema = z.object({
    mustahiq_id: z.string().min(1, 'Mustahiq wajib dipilih'),
    amount: z.coerce
        .number()
        .min(1000, 'Jumlah minimal Rp 1.000'),
    notes: z.string().optional(),
});

/**
 * Distribution Schema
 * Validasi untuk form create / update Distribution (Header)
 */
export const distributionSchema = z.object({
    distribution_date: z.string().min(1, 'Tanggal penyaluran wajib diisi'),
    program_id: z.string().nullable().optional(),
    source_fund_type: z.enum(['zakat_fitrah', 'zakat_maal', 'infaq', 'sadaqah'], {
        message: 'Pilih sumber dana yang valid',
    }),
    notes: z.string().optional(),
    items: z.array(distributionItemSchema).min(1, 'Minimal harus ada 1 penerima manfaat'),
});

/**
 * Tipe data untuk Form Values (Inferred from Zod)
 */
export type DistributionFormValues = z.infer<typeof distributionSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

/**
 * Interface untuk Item Request
 */
export interface DistributionItemRequest {
    mustahiq_id: string;
    amount: number;
    notes?: string;
}

/**
 * Create/Update Distribution Request
 * Payload untuk endpoint POST dan PUT
 */
export interface DistributionRequest {
    distribution_date: string;
    program_id?: string;
    source_fund_type: string;
    notes?: string;
    items: DistributionItemRequest[];
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * Distribution List Response Wrapper
 * GET /api/v1/distributions
 */
export type DistributionListResponseWrapper = ApiListResponse<Distribution>;

/**
 * Distribution Detail/Create/Update Response Wrapper
 * GET/POST/PUT /api/v1/distributions/{id}
 */
export type DistributionResponseWrapper = ApiSuccessResponse<Distribution>;

/**
 * Distribution Delete Response Wrapper
 * DELETE /api/v1/distributions/{id}
 */
export type DistributionDeleteResponseWrapper = ApiEmptySuccessResponse;
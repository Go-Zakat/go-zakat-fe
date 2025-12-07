import { z } from 'zod';
import {
    ApiListResponse,
    ApiSuccessResponse,
    ApiEmptySuccessResponse,
} from '@/src/shared/types/api.types';
import { FUND_TYPES, PAYMENT_METHODS, ZAKAT_TYPES } from '@/src/shared/config/constants';
import { DonationReceipt } from "@/src/shared/types/common.types";


// ============================================================
// MUSTAHIQ TYPES
// ============================================================

/**
 * Donation Receipt Item Schema
 */
export const donationReceiptItemSchema = z.object({
    fund_type: z.enum([FUND_TYPES.ZAKAT, FUND_TYPES.INFAQ, FUND_TYPES.SADAQAH], {
        required_error: 'Jenis dana wajib dipilih',
    }),
    amount: z.coerce
        .number({ invalid_type_error: 'Jumlah harus berupa angka' })
        .min(1000, 'Jumlah minimal Rp 1.000'),
    zakat_type: z
        .enum([ZAKAT_TYPES.FITRAH, ZAKAT_TYPES.MAAL])
        .optional()
        .nullable(),
    person_count: z.coerce
        .number()
        .min(1, 'Jumlah jiwa minimal 1')
        .optional()
        .nullable(),
    rice_kg: z.coerce
        .number()
        .min(0.1, 'Jumlah beras minimal 0.1 kg')
        .optional()
        .nullable(),
    notes: z.string().optional(),
}).refine((data) => {
    // Validasi Zakat Type jika Fund Type adalah Zakat
    return !(data.fund_type === FUND_TYPES.ZAKAT && !data.zakat_type);
}, {
    message: 'Tipe zakat wajib dipilih jika jenis dana adalah Zakat',
    path: ['zakat_type'],
}).refine((data) => {
    // Validasi Person Count jika Zakat Fitrah
    if (data.fund_type === FUND_TYPES.ZAKAT && data.zakat_type === ZAKAT_TYPES.FITRAH) {
        if (!data.person_count && !data.rice_kg) {
            return false; // Salah satu harus diisi (uang atau beras asumsinya dikonversi, tapi form biasanya butuh person_count)
        }
    }
    return true;
}, {
    message: 'Jumlah jiwa wajib diisi untuk Zakat Fitrah',
    path: ['person_count']
});

/**
 * Donation Receipt Schema
 */
export const donationReceiptSchema = z.object({
    receipt_number: z.string().min(1, 'No. Kwitansi wajib diisi'),
    receipt_date: z.string().min(1, 'Tanggal kwitansi wajib diisi'),
    payment_method: z.enum([
        PAYMENT_METHODS.CASH,
        PAYMENT_METHODS.BANK_TRANSFER,
        PAYMENT_METHODS.E_WALLET,
        PAYMENT_METHODS.QRIS,
    ], {
        required_error: 'Metode pembayaran wajib dipilih',
    }),
    muzakki_id: z.string().min(1, 'Muzakki wajib dipilih'),
    notes: z.string().optional(),
    items: z.array(donationReceiptItemSchema).min(1, 'Minimal harus ada 1 item donasi'),
});

export type DonationReceiptFormValues = z.infer<typeof donationReceiptSchema>;
export type DonationReceiptItemFormValues = z.infer<typeof donationReceiptItemSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

export interface DonationReceiptItemRequest {
    amount: number;
    fund_type: string;
    notes?: string;
    person_count?: number;
    rice_kg?: number;
    zakat_type?: string;
}

export interface DonationReceiptRequest {
    items: DonationReceiptItemRequest[];
    muzakki_id: string;
    payment_method: string;
    receipt_date: string;
    receipt_number: string;
    notes?: string;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export type DonationReceiptListResponseWrapper = ApiListResponse<DonationReceipt>;
export type DonationReceiptResponseWrapper = ApiSuccessResponse<DonationReceipt>;
export type DonationReceiptDeleteResponseWrapper = ApiEmptySuccessResponse;

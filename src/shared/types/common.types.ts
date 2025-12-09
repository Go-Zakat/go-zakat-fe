import {
    Role,
    MustahiqStatus,
    FundType,
    ZakatType,
    PaymentMethod,
} from '../config/constants';

// ============================================================
// BASE TYPES
// ============================================================

/**
 * Base Entity (Camel Case)
 * Untuk entitas master: Asnaf, Mustahiq, Muzakki, Program
 */
export interface BaseEntityCamel {
    id: string;
    createdAt: string;
    updatedAt: string;
}

// ============================================================
// MASTER DATA TYPES
// ============================================================

/**
 * User Type (dto.UserResponse)
 */
export interface User extends BaseEntityCamel {
    name: string;
    email: string;
    role: Role;
    avatar?: string | null;
    is_active: boolean;
}

/**
 * Asnaf Type (dto.AsnafResponse)
 */
export interface Asnaf extends BaseEntityCamel {
    name: string;
    description?: string | null;
}

/**
 * Mustahiq Type (dto.MustahiqResponse)
 */
export interface Mustahiq extends BaseEntityCamel {
    name: string;
    address: string;
    phoneNumber: string;
    asnafID: string;
    asnaf?: Asnaf;
    status: MustahiqStatus;
    description?: string | null;
}

/**
 * Muzakki Type (dto.MuzakkiResponse)
 */
export interface Muzakki extends BaseEntityCamel {
    name: string;
    address: string;
    phoneNumber: string;
    notes?: string | null;
}

/**
 * Program Type (dto.ProgramResponse)
 */
export interface Program extends BaseEntityCamel {
    name: string;
    description?: string | null;
    type: string;
    active: boolean;
}

// ============================================================
// TRANSACTION TYPES
// ============================================================

/**
 * Donation Receipt Item (dto.DonationReceiptItemResponse)
 */
export interface DonationReceiptItem {
    id: string;
    amount: number;
    fund_type: FundType;
    zakat_type?: ZakatType | null;
    person_count?: number | null;
    rice_kg?: number | null;
    notes?: string | null;
}

/**
 * Donation Receipt (dto.DonationReceiptResponse)
 */
export interface DonationReceipt extends BaseEntityCamel {
    receipt_number: string;
    receipt_date: string;
    payment_method: PaymentMethod;
    total_amount: number;
    notes?: string | null;
    muzakki_id?: string;
    muzakki_name?: string;
    muzakki?: { id: string; full_name: string };
    created_by_user?: { id: string; full_name: string };
    items?: DonationReceiptItem[];
}

/**
 * Distribution Item (dto.DistributionItemResponse)
 */
export interface DistributionItem {
    id: string;
    amount: number;
    notes?: string | null;
    mustahiq_id: string;
    mustahiq_name: string;
    asnaf_name: string;
    address?: string;
}

/**
 * Distribution (dto.DistributionResponse)
 */
export interface Distribution extends BaseEntityCamel {
    distribution_date: string;
    source_fund_type: string;
    total_amount: number;
    notes?: string | null;
    program?: { id: string; name: string };
    program_name?: string | null;
    created_by_user?: { id: string; full_name: string };
    items?: DistributionItem[];
}

// ============================================================
// REPORT TYPES
// ============================================================

/**
 * Income Summary Item
 */
export interface IncomeSummaryItem {
    period: string;        // e.g., "2025-12"
    zakat_fitrah: number;
    zakat_maal: number;
    infaq: number;
    sadaqah: number;
    total: number;
}

/**
 * Distribution Summary Item
 */
export interface DistributionSummaryItem {
    asnaf_name?: string;
    program_name?: string;
    beneficiary_count: number;
    total_amount: number;
}

/**
 * Fund Balance
 */
export interface FundBalance {
    fund_type: string; // e.g., 'infaq', 'zakat_maal'
    total_in: number;
    total_out: number;
    balance: number;
}

/**
 * Mustahiq History Item
 */
export interface MustahiqHistoryItem {
    distribution_date: string;
    program_name: string;
    source_fund_type: string;
    amount: number;
}

/**
 * Mustahiq History Report Data (Full Response Object)
 * Struktur data lengkap untuk laporan history mustahiq
 */
export interface MustahiqHistoryReport {
    mustahiq: {
        id: string;
        full_name: string;
        asnaf_name: string;
        address: string;
    };
    history: MustahiqHistoryItem[];
    total_received: number;
}
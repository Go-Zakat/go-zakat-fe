import {
    Role,
    Status,
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

/**
 * Base Entity (Snake Case)
 * Untuk entitas transaksi: Contribution, Distribution, dan User
 */
export interface BaseEntitySnake {
    id: string;
    created_at: string;
    updated_at: string;
}

// ============================================================
// MASTER DATA TYPES
// ============================================================

/**
 * User Type (dto.UserResponse)
 */
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Asnaf Type (dto.AsnafResponse)
 */
export interface Asnaf {
    id: string;
    name: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Mustahiq Type (dto.MustahiqResponse)
 */
export interface Mustahiq {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    asnafID: string;
    asnaf?: Asnaf;
    status: MustahiqStatus;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Muzakki Type (dto.MuzakkiResponse)
 */
export interface Muzakki {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    notes?: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Program Type (dto.ProgramResponse)
 */
export interface Program {
    id: string;
    name: string;
    description?: string | null;
    type: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
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
export interface DonationReceipt {
    id: string;
    receipt_number: string;
    receipt_date: string;
    payment_method: PaymentMethod;
    total_amount: number;
    notes?: string | null;
    muzakki_id?: string;
    muzakki?: { id: string; full_name: string };
    created_by_user?: { id: string; full_name: string };
    items?: DonationReceiptItem[];
    created_at: string;
    updated_at: string;
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
export interface Distribution {
    id: string;
    distribution_date: string;
    source_fund_type: string;
    total_amount: number;
    notes?: string | null;
    program?: { id: string; name: string };
    created_by_user?: { id: string; full_name: string };
    items?: DistributionItem[];
    created_at: string;
    updated_at: string;
}

// ============================================================
// REPORT TYPES
// ============================================================

/**
 * Income Summary Item
 */
export interface IncomeSummaryItem {
    fund_type: FundType;
    zakat_type?: ZakatType | null;
    total_amount: number;
    total_rice_kg?: number | null;
    transaction_count: number;
}

/**
 * Distribution Summary Item
 */
export interface DistributionSummaryItem {
    fund_type: FundType;
    asnaf_name?: string;
    program_name?: string;
    total_amount: number;
    beneficiary_count: number;
}

/**
 * Fund Balance
 */
export interface FundBalance {
    fund_type: FundType;
    zakat_type?: ZakatType | null;
    total_income: number;
    total_distribution: number;
    balance: number;
}

/**
 * Mustahiq History Item
 */
export interface MustahiqHistoryItem {
    distribution_date: string;
    program_name?: string;
    fund_type: FundType;
    amount: number;
    notes?: string | null;
}

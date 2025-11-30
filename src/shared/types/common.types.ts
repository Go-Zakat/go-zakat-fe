import {
    Role,
    Status,
    MustahiqStatus,
    FundType,
    ZakatType,
    PaymentMethod,
} from '../config/constants';

// ============================================================
// BASE TYPES - Types dasar yang sering digunakan
// ============================================================

/**
 * Base Entity
 * Properties yang ada di semua entity database
 */
export interface BaseEntity {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

/**
 * User Type
 * Representasi user dalam sistem
 */
export interface User extends BaseEntity {
    name: string;
    email: string;
    role: Role;
    avatar?: string | null;
    is_active: boolean;
}

/**
 * Asnaf Type
 * Golongan penerima zakat (8 golongan)
 */
export interface Asnaf extends BaseEntity {
    name: string; // Fakir, Miskin, Amil, Mualaf, dll
    description?: string | null;
}

/**
 * Mustahiq Type
 * Data penerima zakat/bantuan
 */
export interface Mustahiq extends BaseEntity {
    full_name: string;
    address: string;
    phone?: string | null;
    asnaf_id: string;
    asnaf?: Asnaf; // Relasi ke asnaf
    status: MustahiqStatus;
    notes?: string | null;
}

/**
 * Muzakki Type
 * Data pembayar zakat/donatur
 */
export interface Muzakki extends BaseEntity {
    full_name: string;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    notes?: string | null;
}

/**
 * Program Type
 * Program penyaluran dana
 */
export interface Program extends BaseEntity {
    name: string;
    description?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    is_active: boolean;
}

// ============================================================
// TRANSACTION TYPES - Types untuk transaksi
// ============================================================

/**
 * Donation Receipt Item
 * Item dalam bukti penerimaan donasi
 */
export interface DonationReceiptItem {
    id: string;
    donation_receipt_id: string;
    fund_type: FundType;
    zakat_type?: ZakatType | null;
    person_count?: number | null;
    amount: number;
    rice_kg?: number | null;
    notes?: string | null;
}

/**
 * Donation Receipt
 * Bukti penerimaan donasi dari muzakki
 */
export interface DonationReceipt extends BaseEntity {
    muzakki_id: string;
    muzakki?: Muzakki;
    receipt_number: string;
    receipt_date: string;
    payment_method: PaymentMethod;
    total_amount: number;
    notes?: string | null;
    items?: DonationReceiptItem[];
}

/**
 * Distribution Item
 * Item dalam penyaluran dana ke mustahiq
 */
export interface DistributionItem {
    id: string;
    distribution_id: string;
    mustahiq_id: string;
    mustahiq?: Mustahiq;
    amount: number;
    notes?: string | null;
}

/**
 * Distribution
 * Data penyaluran dana ke mustahiq
 */
export interface Distribution extends BaseEntity {
    distribution_date: string;
    program_id?: string | null;
    program?: Program;
    source_fund_type: FundType;
    total_amount: number;
    notes?: string | null;
    items?: DistributionItem[];
}

// ============================================================
// REPORT TYPES - Types untuk laporan
// ============================================================

/**
 * Income Summary Item
 * Item dalam laporan pemasukan
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
 * Item dalam laporan penyaluran
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
 * Saldo dana per jenis
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
 * Riwayat penerimaan bantuan oleh mustahiq
 */
export interface MustahiqHistoryItem {
    distribution_date: string;
    program_name?: string;
    fund_type: FundType;
    amount: number;
    notes?: string | null;
}

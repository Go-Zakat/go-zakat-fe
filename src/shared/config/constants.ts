// ============================================================
// ROLES - Peran pengguna dalam sistem
// ============================================================
export const ROLES = {
    ADMIN: 'admin',
    STAFF: 'staff',
    USER: 'user',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// ============================================================
// FUND TYPES - Jenis dana dalam sistem zakat
// ============================================================
export const FUND_TYPES = {
    ZAKAT: 'zakat',
    INFAQ: 'infaq',
    SADAQAH: 'sadaqah',
} as const;

export type FundType = (typeof FUND_TYPES)[keyof typeof FUND_TYPES];

// ============================================================
// ZAKAT TYPES - Jenis zakat (fitrah atau maal)
// ============================================================
export const ZAKAT_TYPES = {
    FITRAH: 'fitrah',
    MAAL: 'maal',
} as const;

export type ZakatType = (typeof ZAKAT_TYPES)[keyof typeof ZAKAT_TYPES];

// ============================================================
// PAYMENT METHODS - Metode pembayaran
// ============================================================
export const PAYMENT_METHODS = {
    CASH: 'cash',
    BANK_TRANSFER: 'bank_transfer',
    E_WALLET: 'e_wallet',
    QRIS: 'qris',
} as const;

export type PaymentMethod =
    (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

// ============================================================
// STATUS - Status umum untuk entitas
// ============================================================
export const STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

// ============================================================
// MUSTAHIQ STATUS - Status khusus untuk mustahiq
// ============================================================
export const MUSTAHIQ_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    GRADUATED: 'graduated', // Sudah tidak membutuhkan bantuan
} as const;

export type MustahiqStatus =
    (typeof MUSTAHIQ_STATUS)[keyof typeof MUSTAHIQ_STATUS];

// ============================================================
// PAGINATION - Default values untuk pagination
// ============================================================
export const PAGINATION_DEFAULTS = {
    PAGE: 1,
    PER_PAGE: 10,
    MAX_PER_PAGE: 100,
} as const;

// ============================================================
// DATE FORMATS - Format tanggal yang digunakan dalam aplikasi
// ============================================================
export const DATE_FORMATS = {
    API: 'YYYY-MM-DD', // Format untuk API (ISO)
    DISPLAY: 'DD/MM/YYYY', // Format untuk tampilan user
    DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm', // Format dengan waktu
} as const;

// ============================================================
// STORAGE KEYS - Keys untuk localStorage dan cookies
// ============================================================
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
} as const;

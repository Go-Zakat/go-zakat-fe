export const ENDPOINTS = {
    // ================== AUTH ==================
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        ME: '/api/v1/auth/me',
        REFRESH: '/api/v1/auth/refresh',
        GOOGLE_LOGIN: '/api/v1/auth/google/login',
        GOOGLE_CALLBACK: '/api/v1/auth/google/callback',
        GOOGLE_MOBILE_LOGIN: '/api/v1/auth/google/mobile/login',
    },

    // ================== ASNAF ==================
    ASNAF: {
        LIST: '/api/v1/asnaf',
        CREATE: '/api/v1/asnaf',
        DETAIL: (id: string) => `/api/v1/asnaf/${id}`,
        UPDATE: (id: string) => `/api/v1/asnaf/${id}`,
        DELETE: (id: string) => `/api/v1/asnaf/${id}`,
    },

    // ================== MUSTAHIQ ==================
    MUSTAHIQ: {
        LIST: '/api/v1/mustahiq',
        CREATE: '/api/v1/mustahiq',
        DETAIL: (id: string) => `/api/v1/mustahiq/${id}`,
        UPDATE: (id: string) => `/api/v1/mustahiq/${id}`,
        DELETE: (id: string) => `/api/v1/mustahiq/${id}`,
    },

    // ================== MUZAKKI ==================
    MUZAKKI: {
        LIST: '/api/v1/muzakki',
        CREATE: '/api/v1/muzakki',
        DETAIL: (id: string) => `/api/v1/muzakki/${id}`,
        UPDATE: (id: string) => `/api/v1/muzakki/${id}`,
        DELETE: (id: string) => `/api/v1/muzakki/${id}`,
    },

    // ================== PROGRAMS ==================
    PROGRAMS: {
        LIST: '/api/v1/programs',
        CREATE: '/api/v1/programs',
        DETAIL: (id: string) => `/api/v1/programs/${id}`,
        UPDATE: (id: string) => `/api/v1/programs/${id}`,
        DELETE: (id: string) => `/api/v1/programs/${id}`,
    },

    // ================== DONATION RECEIPTS ==================
    DONATION_RECEIPTS: {
        LIST: '/api/v1/donation-receipts',
        CREATE: '/api/v1/donation-receipts',
        DETAIL: (id: string) => `/api/v1/donation-receipts/${id}`,
        UPDATE: (id: string) => `/api/v1/donation-receipts/${id}`,
        DELETE: (id: string) => `/api/v1/donation-receipts/${id}`,
    },

    // ================== DISTRIBUTIONS ==================
    DISTRIBUTIONS: {
        LIST: '/api/v1/distributions',
        CREATE: '/api/v1/distributions',
        DETAIL: (id: string) => `/api/v1/distributions/${id}`,
        UPDATE: (id: string) => `/api/v1/distributions/${id}`,
        DELETE: (id: string) => `/api/v1/distributions/${id}`,
    },

    // ================== REPORTS ==================
    REPORTS: {
        INCOME_SUMMARY: '/api/v1/reports/income-summary',
        DISTRIBUTION_SUMMARY: '/api/v1/reports/distribution-summary',
        FUND_BALANCE: '/api/v1/reports/fund-balance',
        MUSTAHIQ_HISTORY: (id: string) => `/api/v1/reports/mustahiq-history/${id}`,
    },

    // ================== USERS ==================
    USERS: {
        LIST: '/api/v1/users',
        DETAIL: (id: string) => `/api/v1/users/${id}`,
        UPDATE_ROLE: (id: string) => `/api/v1/users/${id}/role`,
    },
} as const;

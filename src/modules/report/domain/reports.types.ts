import { ApiSuccessResponse } from '@/src/shared/types/api.types';
import {
    FundBalance,
    IncomeSummaryItem,
    DistributionSummaryItem,
    MustahiqHistoryReport
} from '@/src/shared/types/common.types';

// ============================================================
// API REQUEST PARAMETERS (FILTERS)
// ============================================================

export interface DateRangeParams {
    date_from?: string; // YYYY-MM-DD
    date_to?: string;   // YYYY-MM-DD
}

export interface GetIncomeSummaryParams extends DateRangeParams {
    group_by?: 'daily' | 'monthly';
}

export interface GetDistributionSummaryParams extends DateRangeParams {
    group_by?: 'asnaf' | 'program';
    source_fund_type?: string;
}

export type GetFundBalanceParams = DateRangeParams;

// ============================================================
// API RESPONSE WRAPPERS
// ============================================================

/**
 * Report Income Summary Response Wrapper
 * GET /api/v1/reports/income-summary
 */
export type IncomeSummaryResponse = ApiSuccessResponse<IncomeSummaryItem[]>;

/**
 * Report Distribution Response Wrapper
 * GET /api/v1/reports/distribution-summary
 */
export type DistributionSummaryResponse = ApiSuccessResponse<DistributionSummaryItem[]>;

/**
 * Rerort Fund Balance Response Wrapper
 * GET /api/v1/reports/fund-balance
 */
export type FundBalanceResponse = ApiSuccessResponse<FundBalance[]>;

/**
 * Report Mustahiq History Response Wrapper
 * GET /api/v1/reports/mustahiq-history/{id}
 */
export type MustahiqHistoryResponse = ApiSuccessResponse<MustahiqHistoryReport>;
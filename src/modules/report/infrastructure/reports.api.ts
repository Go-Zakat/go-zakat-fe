import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    GetIncomeSummaryParams,
    GetDistributionSummaryParams,
    IncomeSummaryResponse,
    DistributionSummaryResponse,
    FundBalanceResponse,
    MustahiqHistoryResponse,
    GetFundBalanceParams,
} from '../domain/reports.types';

/**
 * Reports API
 * API calls untuk data statistik dan laporan
 */
export const reportsApi = {
    getIncomeSummary: async (params?: GetIncomeSummaryParams): Promise<IncomeSummaryResponse> => {
        const response = await httpClient.get<IncomeSummaryResponse>(
            ENDPOINTS.REPORTS.INCOME_SUMMARY,
            { params }
        );
        return response.data;
    },

    getDistributionSummary: async (params?: GetDistributionSummaryParams): Promise<DistributionSummaryResponse> => {
        const response = await httpClient.get<DistributionSummaryResponse>(
            ENDPOINTS.REPORTS.DISTRIBUTION_SUMMARY,
            { params }
        );
        return response.data;
    },

    getFundBalance: async (params?: GetFundBalanceParams): Promise<FundBalanceResponse> => {
        const response = await httpClient.get<FundBalanceResponse>(
            ENDPOINTS.REPORTS.FUND_BALANCE,
            { params }
        );
        return response.data;
    },

    getMustahiqHistory: async (id: string): Promise<MustahiqHistoryResponse> => {
        const response = await httpClient.get<MustahiqHistoryResponse>(
            ENDPOINTS.REPORTS.MUSTAHIQ_HISTORY(id)
        );
        return response.data;
    },
};
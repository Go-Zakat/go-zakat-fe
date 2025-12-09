import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    DistributionListResponseWrapper,
    DistributionResponseWrapper,
    DistributionDeleteResponseWrapper,
    DistributionRequest,
} from '../domain/distribution.types';

/**
 * Query params untuk GET /api/v1/distributions
 * Sesuai dokumentasi Swagger
 */
export interface GetDistributionListParams {
    q?: string;              // Search in program name or notes
    page?: number;
    per_page?: number;
    date_from?: string;      // YYYY-MM-DD
    date_to?: string;        // YYYY-MM-DD
    source_fund_type?: string; // zakat_fitrah, zakat_maal, infaq, sadaqah
    program_id?: string;     // Filter by program ID
}

/**
 * Distribution API
 * Semua API calls untuk operasional Penyaluran
 */
export const distributionApi = {
    getList: async (params?: GetDistributionListParams): Promise<DistributionListResponseWrapper> => {
        const response = await httpClient.get<DistributionListResponseWrapper>(
            ENDPOINTS.DISTRIBUTIONS.LIST,
            { params }
        );
        return response.data;
    },

    getById: async (id: string): Promise<DistributionResponseWrapper> => {
        const response = await httpClient.get<DistributionResponseWrapper>(
            ENDPOINTS.DISTRIBUTIONS.DETAIL(id)
        );
        return response.data;
    },

    create: async (data: DistributionRequest): Promise<DistributionResponseWrapper> => {
        const response = await httpClient.post<DistributionResponseWrapper>(
            ENDPOINTS.DISTRIBUTIONS.CREATE,
            data
        );
        return response.data;
    },

    update: async (id: string, data: DistributionRequest): Promise<DistributionResponseWrapper> => {
        const response = await httpClient.put<DistributionResponseWrapper>(
            ENDPOINTS.DISTRIBUTIONS.UPDATE(id),
            data
        );
        return response.data;
    },

    delete: async (id: string): Promise<DistributionDeleteResponseWrapper> => {
        const response = await httpClient.delete<DistributionDeleteResponseWrapper>(
            ENDPOINTS.DISTRIBUTIONS.DELETE(id)
        );
        return response.data;
    },
};
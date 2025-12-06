import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    AsnafListResponseWrapper,
    AsnafResponseWrapper,
    AsnafDeleteResponseWrapper, AsnafRequest,
} from '../domain/asnaf.types';

/**
 * Query params untuk GET /api/v1/asnaf
 */
export interface GetAsnafListParams {
    q?: string;        // search by name
    page?: number;     // default 1
    per_page?: number; // default 10
}

/**
 * Asnaf API
 * Semua API calls untuk master data Asnaf
 */
export const asnafApi = {
    /**
     * Get List Asnaf
     * GET /api/v1/asnaf
     */
    getList: async (
        params?: GetAsnafListParams
    ): Promise<AsnafListResponseWrapper> => {
        const response = await httpClient.get<AsnafListResponseWrapper>(
            ENDPOINTS.ASNAF.LIST,
            { params }
        );
        return response.data;
    },

    /**
     * Get Detail Asnaf
     * GET /api/v1/asnaf/{id}
     */
    getById: async (id: string): Promise<AsnafResponseWrapper> => {
        const response = await httpClient.get<AsnafResponseWrapper>(
            ENDPOINTS.ASNAF.DETAIL(id)
        );
        return response.data;
    },

    /**
     * Create Asnaf
     * POST /api/v1/asnaf
     */
    create: async (data: AsnafRequest): Promise<AsnafResponseWrapper> => {
        const response = await httpClient.post<AsnafResponseWrapper>(
            ENDPOINTS.ASNAF.LIST,
            data
        );
        return response.data;
    },

    /**
     * Update Asnaf
     * PUT /api/v1/asnaf/{id}
     */
    update: async (
        id: string,
        data: AsnafRequest
    ): Promise<AsnafResponseWrapper> => {
        const response = await httpClient.put<AsnafResponseWrapper>(
            ENDPOINTS.ASNAF.DETAIL(id),
            data
        );
        return response.data;
    },

    /**
     * Delete Asnaf
     * DELETE /api/v1/asnaf/{id}
     */
    delete: async (id: string): Promise<AsnafDeleteResponseWrapper> => {
        const response = await httpClient.delete<AsnafDeleteResponseWrapper>(
            ENDPOINTS.ASNAF.DETAIL(id)
        );
        return response.data;
    },
};

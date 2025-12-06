import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import { MustahiqStatus } from '@/src/shared/config/constants';
import {
    MustahiqListResponseWrapper,
    MustahiqResponseWrapper,
    MustahiqDeleteResponseWrapper,
    MustahiqRequest,
} from '../domain/mustahiq.types';

/**
 * Query params untuk GET /api/v1/mustahiq
 */
export interface GetMustahiqListParams {
    q?: string;           // search by name or address
    page?: number;        // default 1
    per_page?: number;    // default 10
    status?: MustahiqStatus;
    asnafID?: string;
}

/**
 * Mustahiq API
 * Semua API calls untuk master data Mustahiq
 */
export const mustahiqApi = {
    /**
     * Get List Mustahiq
     * GET /api/v1/mustahiq
     */
    getList: async (
        params?: GetMustahiqListParams
    ): Promise<MustahiqListResponseWrapper> => {
        const response = await httpClient.get<MustahiqListResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.LIST,
            { params }
        );
        return response.data;
    },

    /**
     * Get Detail Mustahiq
     * GET /api/v1/mustahiq/{id}
     */
    getById: async (id: string): Promise<MustahiqResponseWrapper> => {
        const response = await httpClient.get<MustahiqResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.DETAIL(id)
        );
        return response.data;
    },

    /**
     * Create Mustahiq
     * POST /api/v1/mustahiq
     */
    create: async (data: MustahiqRequest): Promise<MustahiqResponseWrapper> => {
        const response = await httpClient.post<MustahiqResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.CREATE,
            data
        );
        return response.data;
    },

    /**
     * Update Mustahiq
     * PUT /api/v1/mustahiq/{id}
     */
    update: async (
        id: string,
        data: MustahiqRequest
    ): Promise<MustahiqResponseWrapper> => {
        const response = await httpClient.put<MustahiqResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.UPDATE(id),
            data
        );
        return response.data;
    },

    /**
     * Delete Mustahiq
     * DELETE /api/v1/mustahiq/{id}
     */
    delete: async (id: string): Promise<MustahiqDeleteResponseWrapper> => {
        const response = await httpClient.delete<MustahiqDeleteResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.DELETE(id)
        );
        return response.data;
    },
};

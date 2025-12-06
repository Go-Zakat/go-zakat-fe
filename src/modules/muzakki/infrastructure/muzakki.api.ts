import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    MuzakkiListResponseWrapper,
    MuzakkiResponseWrapper,
    MuzakkiDeleteResponseWrapper,
    MuzakkiRequest,
} from '../domain/muzakki.types';

/**
 * Query params untuk GET /api/v1/muzakki
 */
export interface GetMuzakkiListParams {
    q?: string;        // search by name
    page?: number;     // default 1
    per_page?: number; // default 10
}

/**
 * Muzakki API
 * Semua API calls untuk master data Muzakki
 */
export const muzakkiApi = {
    /**
     * Get List Muzakki
     * GET /api/v1/muzakki
     */
    getList: async (
        params?: GetMuzakkiListParams
    ): Promise<MuzakkiListResponseWrapper> => {
        const response = await httpClient.get<MuzakkiListResponseWrapper>(
            ENDPOINTS.MUZAKKI.LIST,
            { params }
        );
        return response.data;
    },

    /**
     * Get Detail Muzakki
     * GET /api/v1/muzakki/{id}
     */
    getById: async (id: string): Promise<MuzakkiResponseWrapper> => {
        const response = await httpClient.get<MuzakkiResponseWrapper>(
            ENDPOINTS.MUZAKKI.DETAIL(id)
        );
        return response.data;
    },

    /**
     * Create Muzakki
     * POST /api/v1/muzakki
     */
    create: async (data: MuzakkiRequest): Promise<MuzakkiResponseWrapper> => {
        const response = await httpClient.post<MuzakkiResponseWrapper>(
            ENDPOINTS.MUZAKKI.LIST,
            data
        );
        return response.data;
    },

    /**
     * Update Muzakki
     * PUT /api/v1/muzakki/{id}
     */
    update: async (
        id: string,
        data: MuzakkiRequest
    ): Promise<MuzakkiResponseWrapper> => {
        const response = await httpClient.put<MuzakkiResponseWrapper>(
            ENDPOINTS.MUZAKKI.DETAIL(id),
            data
        );
        return response.data;
    },

    /**
     * Delete Muzakki
     * DELETE /api/v1/muzakki/{id}
     */
    delete: async (id: string): Promise<MuzakkiDeleteResponseWrapper> => {
        const response = await httpClient.delete<MuzakkiDeleteResponseWrapper>(
            ENDPOINTS.MUZAKKI.DETAIL(id)
        );
        return response.data;
    },
};

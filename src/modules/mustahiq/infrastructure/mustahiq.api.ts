import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
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
    q?: string;        // search by name
    page?: number;     // default 1
    per_page?: number; // default 10
    asnafID?: string;  // filter by asnaf
    status?: string;   // filter by status
}

/**
 * Mustahiq API
 * Semua API calls untuk master data Mustahiq
 */
export const mustahiqApi = {
    getList: async (params?: GetMustahiqListParams): Promise<MustahiqListResponseWrapper> => {
        const response = await httpClient.get<MustahiqListResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.LIST,
            { params }
        );
        return response.data;
    },

    getById: async (id: string): Promise<MustahiqResponseWrapper> => {
        const response = await httpClient.get<MustahiqResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.DETAIL(id)
        );
        return response.data;
    },

    create: async (data: MustahiqRequest): Promise<MustahiqResponseWrapper> => {
        const response = await httpClient.post<MustahiqResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.CREATE,
            data
        );
        return response.data;
    },

    update: async (id: string, data: MustahiqRequest): Promise<MustahiqResponseWrapper> => {
        const response = await httpClient.put<MustahiqResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.UPDATE(id),
            data
        );
        return response.data;
    },

    delete: async (id: string): Promise<MustahiqDeleteResponseWrapper> => {
        const response = await httpClient.delete<MustahiqDeleteResponseWrapper>(
            ENDPOINTS.MUSTAHIQ.DELETE(id)
        );
        return response.data;
    },
};
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
    getList: async (params?: GetMuzakkiListParams): Promise<MuzakkiListResponseWrapper> => {
        const response = await httpClient.get<MuzakkiListResponseWrapper>(
            ENDPOINTS.MUZAKKI.LIST,
            { params }
        );
        return response.data;
    },

    getById: async (id: string): Promise<MuzakkiResponseWrapper> => {
        const response = await httpClient.get<MuzakkiResponseWrapper>(
            ENDPOINTS.MUZAKKI.DETAIL(id)
        );
        return response.data;
    },

    create: async (data: MuzakkiRequest): Promise<MuzakkiResponseWrapper> => {
        const response = await httpClient.post<MuzakkiResponseWrapper>(
            ENDPOINTS.MUZAKKI.CREATE,
            data
        );
        return response.data;
    },

    update: async (id: string, data: MuzakkiRequest): Promise<MuzakkiResponseWrapper> => {
        const response = await httpClient.put<MuzakkiResponseWrapper>(
            ENDPOINTS.MUZAKKI.UPDATE(id),
            data
        );
        return response.data;
    },

    delete: async (id: string): Promise<MuzakkiDeleteResponseWrapper> => {
        const response = await httpClient.delete<MuzakkiDeleteResponseWrapper>(
            ENDPOINTS.MUZAKKI.DELETE(id)
        );
        return response.data;
    },
};
import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    AsnafListResponseWrapper,
    AsnafResponseWrapper,
    AsnafDeleteResponseWrapper,
    AsnafRequest,
} from '../domain/asnaf.types';

/**
 * Query params untuk GET /api/v1/asnaf
 */
export interface GetAsnafListParams {
    q?: string;
    page?: number;
    per_page?: number;
}

/**
 * Asnaf API
 * Semua API calls untuk master data Asnaf
 */
export const asnafApi = {
    getList: async (params?: GetAsnafListParams): Promise<AsnafListResponseWrapper> => {
        const response = await httpClient.get<AsnafListResponseWrapper>(
            ENDPOINTS.ASNAF.LIST,
            { params }
        );
        return response.data;
    },

    getById: async (id: string): Promise<AsnafResponseWrapper> => {
        const response = await httpClient.get<AsnafResponseWrapper>(
            ENDPOINTS.ASNAF.DETAIL(id)
        );
        return response.data;
    },

    create: async (data: AsnafRequest): Promise<AsnafResponseWrapper> => {
        const response = await httpClient.post<AsnafResponseWrapper>(
            ENDPOINTS.ASNAF.CREATE,
            data
        );
        return response.data;
    },

    update: async (id: string, data: AsnafRequest): Promise<AsnafResponseWrapper> => {
        const response = await httpClient.put<AsnafResponseWrapper>(
            ENDPOINTS.ASNAF.UPDATE(id),
            data
        );
        return response.data;
    },

    delete: async (id: string): Promise<AsnafDeleteResponseWrapper> => {
        const response = await httpClient.delete<AsnafDeleteResponseWrapper>(
            ENDPOINTS.ASNAF.DELETE(id)
        );
        return response.data;
    },
};
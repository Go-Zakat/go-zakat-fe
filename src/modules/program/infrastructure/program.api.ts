import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    ProgramListResponseWrapper,
    ProgramResponseWrapper,
    ProgramDeleteResponseWrapper,
    ProgramRequest,
} from '../domain/program.types';

/**
 * Query params untuk GET /api/v1/programs
 */
export interface GetProgramListParams {
    q?: string;        // search by name
    page?: number;     // default 1
    per_page?: number; // default 10
    active?: boolean;  // filter by active status
    type?: string;     // filter by type
}

/**
 * Program API
 * Semua API calls untuk master data Program
 */
export const programApi = {
    getList: async (params?: GetProgramListParams): Promise<ProgramListResponseWrapper> => {
        const response = await httpClient.get<ProgramListResponseWrapper>(
            ENDPOINTS.PROGRAMS.LIST,
            { params }
        );
        return response.data;
    },

    getById: async (id: string): Promise<ProgramResponseWrapper> => {
        const response = await httpClient.get<ProgramResponseWrapper>(
            ENDPOINTS.PROGRAMS.DETAIL(id)
        );
        return response.data;
    },

    create: async (data: ProgramRequest): Promise<ProgramResponseWrapper> => {
        const response = await httpClient.post<ProgramResponseWrapper>(
            ENDPOINTS.PROGRAMS.CREATE,
            data
        );
        return response.data;
    },

    update: async (id: string, data: ProgramRequest): Promise<ProgramResponseWrapper> => {
        const response = await httpClient.put<ProgramResponseWrapper>(
            ENDPOINTS.PROGRAMS.UPDATE(id),
            data
        );
        return response.data;
    },

    delete: async (id: string): Promise<ProgramDeleteResponseWrapper> => {
        const response = await httpClient.delete<ProgramDeleteResponseWrapper>(
            ENDPOINTS.PROGRAMS.DELETE(id)
        );
        return response.data;
    },
};
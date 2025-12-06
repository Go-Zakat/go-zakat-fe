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
    /**
     * Get List Program
     * GET /api/v1/programs
     */
    getList: async (
        params?: GetProgramListParams
    ): Promise<ProgramListResponseWrapper> => {
        const response = await httpClient.get<ProgramListResponseWrapper>(
            ENDPOINTS.PROGRAMS.LIST,
            { params }
        );
        return response.data;
    },

    /**
     * Get Detail Program
     * GET /api/v1/programs/{id}
     */
    getById: async (id: string): Promise<ProgramResponseWrapper> => {
        const response = await httpClient.get<ProgramResponseWrapper>(
            ENDPOINTS.PROGRAMS.DETAIL(id)
        );
        return response.data;
    },

    /**
     * Create Program
     * POST /api/v1/programs
     */
    create: async (data: ProgramRequest): Promise<ProgramResponseWrapper> => {
        const response = await httpClient.post<ProgramResponseWrapper>(
            ENDPOINTS.PROGRAMS.LIST,
            data
        );
        return response.data;
    },

    /**
     * Update Program
     * PUT /api/v1/programs/{id}
     */
    update: async (
        id: string,
        data: ProgramRequest
    ): Promise<ProgramResponseWrapper> => {
        const response = await httpClient.put<ProgramResponseWrapper>(
            ENDPOINTS.PROGRAMS.DETAIL(id),
            data
        );
        return response.data;
    },

    /**
     * Delete Program
     * DELETE /api/v1/programs/{id}
     */
    delete: async (id: string): Promise<ProgramDeleteResponseWrapper> => {
        const response = await httpClient.delete<ProgramDeleteResponseWrapper>(
            ENDPOINTS.PROGRAMS.DETAIL(id)
        );
        return response.data;
    },
};

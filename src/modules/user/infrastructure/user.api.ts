import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    UserListResponseWrapper,
    UserResponseWrapper,
    UpdateRoleRequest
} from '../domain/user.types';

/**
 * Query params untuk GET /api/v1/users
 */
export interface GetUserListParams {
    q?: string;
    page?: number;
    per_page?: number;
}

export const userApi = {
    getList: async (params?: GetUserListParams): Promise<UserListResponseWrapper> => {
        const response = await httpClient.get<UserListResponseWrapper>(
            ENDPOINTS.USERS.LIST,
            { params }
        );
        return response.data;
    },

    getById: async (id: string): Promise<UserResponseWrapper> => {
        const response = await httpClient.get<UserResponseWrapper>(
            ENDPOINTS.USERS.DETAIL(id)
        );
        return response.data;
    },

    updateRole: async (id: string, data: UpdateRoleRequest): Promise<UserResponseWrapper> => {
        const response = await httpClient.put<UserResponseWrapper>(
            ENDPOINTS.USERS.UPDATE_ROLE(id),
            data
        );
        return response.data;
    }
};
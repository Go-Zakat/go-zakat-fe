import { z } from 'zod';
import { User } from '@/src/shared/types/common.types';
import { ApiListResponse, ApiSuccessResponse } from '@/src/shared/types/api.types';

// ============================================================
// USER SCHEMA & FORM VALUES
// ============================================================

/**
 * Update Role Schema
 */
export const updateRoleSchema = z.object({
    role: z.enum(['admin', 'staf', 'viewer'], {
        message: "Role wajib dipilih"
    })
});

export type UpdateRoleFormValues = z.infer<typeof updateRoleSchema>;

// ============================================================
// API REQUEST TYPES
// ============================================================

export interface UpdateRoleRequest {
    role: string;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * User List Response Wrapper
 * GET /api/v1/users
 */
export type UserListResponseWrapper = ApiListResponse<User>;

/**
 * User Detail Response Wrapper
 * GET /api/v1/users/{id}
 */
export type UserResponseWrapper = ApiSuccessResponse<User>;
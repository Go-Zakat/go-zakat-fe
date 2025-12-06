import { z } from 'zod';
import { ApiSuccessResponse } from '@/src/shared/types/api.types';
import { User } from '@/src/shared/types/common.types';

// ============================================================
// LOGIN TYPES
// ============================================================

/**
 * Login Schema
 * Validasi untuk form login
 */
export const loginSchema = z.object({
    email: z.email('Format email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
});

export type LoginRequest = z.infer<typeof loginSchema>;

// ============================================================
// REGISTER TYPES
// ============================================================

/**
 * Register Schema
 * Validasi untuk form register
 */
export const registerSchema = z
    .object({
        name: z.string().min(3, 'Nama minimal 3 karakter'),
        email: z.email('Format email tidak valid'),
        password: z.string().min(8, 'Password minimal 8 karakter'),
        password_confirmation: z.string().min(8, 'Konfirmasi password minimal 8 karakter'),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Password tidak cocok',
        path: ['password_confirmation'],
    });

export type RegisterRequest = z.infer<typeof registerSchema>;

// ============================================================
// RESPONSE TYPES
// ============================================================

/**
 * Auth Response
 * Response dari login/register
 */
export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

/**
 * Auth Response Wrapper
 * Wrapper untuk response dari API
 */
export type AuthResponseWrapper = ApiSuccessResponse<AuthResponse>;

/**
 * Google Login Response
 * Response dari endpoint get google login url
 */
export type GoogleLoginResponse = ApiSuccessResponse<{
    auth_url: string;
}>;

import { z } from 'zod';

// ============================================================
// LOGIN TYPES
// ============================================================

/**
 * Login Schema
 * Validasi untuk form login
 */
export const loginSchema = z.object({
    email: z.email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
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
        email: z.email('Email tidak valid'),
        password: z.string().min(6, 'Password minimal 6 karakter'),
        password_confirmation: z.string().min(6, 'Konfirmasi password minimal 6 karakter'),
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
 * User Type
 * Data user yang login
 */
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

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
export interface AuthResponseWrapper {
    data: AuthResponse;
    message: string;
    status: number;
}

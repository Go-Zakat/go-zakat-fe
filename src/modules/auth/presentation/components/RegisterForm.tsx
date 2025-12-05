'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { registerSchema, RegisterRequest } from '../../domain/auth.types';
import { useRegister } from '../../application/useRegister';
import { useGoogleLogin } from '../../application/useGoogleLogin';
import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { Divider } from '@/src/shared/ui/components/Divider';

/**
 * RegisterForm Component
 * Form untuk register user baru
 */
export const RegisterForm = () => {
    const { register: registerUser, isLoading, error } = useRegister();
    const { loginWithGoogle, isLoading: isGoogleLoading } = useGoogleLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const onSubmit = (data: RegisterRequest) => {
        registerUser(data);
    };

    return (
        <Card>
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Daftar</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Buat akun baru untuk mulai menggunakan aplikasi
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <Input
                    label="Nama Lengkap"
                    registration={register('name')}
                    error={errors.name}
                    type="text"
                    placeholder="John Doe"
                    disabled={isLoading}
                />

                {/* Email */}
                <Input
                    label="Email"
                    registration={register('email')}
                    error={errors.email}
                    type="email"
                    placeholder="nama@example.com"
                    disabled={isLoading}
                />

                {/* Password */}
                <Input
                    label="Password"
                    registration={register('password')}
                    error={errors.password}
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                />

                {/* Password Confirmation */}
                <Input
                    label="Konfirmasi Password"
                    registration={register('password_confirmation')}
                    error={errors.password_confirmation}
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    isLoading={isLoading}
                    fullWidth
                    variant="primary"
                >
                    Daftar
                </Button>
            </form>

            {/* Divider */}
            <Divider text="Atau" />

            {/* Google Login Button */}
            <Button
                type="button"
                onClick={loginWithGoogle}
                isLoading={isGoogleLoading}
                disabled={isLoading}
                fullWidth
                variant="outline"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                Masuk dengan Google
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Masuk di sini
                </Link>
            </p>
        </Card>
    );
};

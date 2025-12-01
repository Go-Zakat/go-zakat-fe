'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { registerSchema, RegisterRequest } from '../../domain/auth.types';
import { useRegister } from '../../application/useRegister';
import { useGoogleLogin } from '../../application/useGoogleLogin';

/**
 * RegisterForm Component
 * Form untuk register user baru
 */
export const RegisterForm = () => {
    const { register: registerUser, isLoading, error } = useRegister();
    const { loginWithGoogle, isLoading: isGoogleLoading } = useGoogleLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Daftar</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Buat akun baru untuk mulai menggunakan aplikasi
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 text-sm text-red-700 bg-red-50 rounded-md border border-red-200">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Nama Lengkap
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="John Doe"
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="nama@example.com"
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Password Confirmation */}
                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Konfirmasi Password
                    </label>
                    <div className="relative">
                        <input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('password_confirmation')}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10 ${errors.password_confirmation
                                ? 'border-red-500'
                                : 'border-gray-300'
                                }`}
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="cursor-pointer absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.password_confirmation && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Memproses...' : 'Daftar'}
                </button>
            </form>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Atau</span>
                </div>
            </div>

            {/* Google Login Button */}
            <button
                type="button"
                onClick={loginWithGoogle}
                disabled={isGoogleLoading || isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                {isGoogleLoading ? 'Memproses...' : 'Masuk dengan Google'}
            </button>

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
        </div>
    );
};

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { registerSchema, RegisterRequest } from '../../domain/auth.types';
import { useRegister } from '../../application/useRegister';

/**
 * RegisterForm Component
 * Form untuk register user baru
 */
export const RegisterForm = () => {
    const { register: registerUser, isLoading, error } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>({
        resolver: zodResolver(registerSchema),
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
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="••••••••"
                        disabled={isLoading}
                    />
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
                    <input
                        id="password_confirmation"
                        type="password"
                        {...register('password_confirmation')}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.password_confirmation
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                        placeholder="••••••••"
                        disabled={isLoading}
                    />
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
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Memproses...' : 'Daftar'}
                </button>
            </form>

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

import { z } from 'zod';

// Schema untuk validasi environment variables (Zod v4 style)
const envSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z
        .url()
        .default('http://localhost:8080'),
});

// Ambil environment variables dari process.env
const processEnv = {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};

// Parse dan validasi environment variables
const parsedEnv = envSchema.safeParse(processEnv);

if (!parsedEnv.success) {
    const { fieldErrors } = z.flattenError(parsedEnv.error);

    console.error(
        '❌ Environment variables tidak valid:',
        fieldErrors
    );

    throw new Error('Invalid environment variables');
}

// Export environment variables yang sudah tervalidasi
export const env = parsedEnv.data;

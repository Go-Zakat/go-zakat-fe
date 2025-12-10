import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // Basepath tetap wajib ada
    basePath: '/go-zakat-fe',

    async redirects() {
        return [
            // ATURAN 1: Menangani halaman root kosong (https://go-zakat-fe.vercel.app/)
            {
                source: '/',
                destination: 'https://www.muhdila.com/go-zakat-fe',
                basePath: false, // Abaikan /go-zakat-fe untuk rule ini
                permanent: false,
            },
            // ATURAN 2: Menangani semua halaman dalam (https://go-zakat-fe.vercel.app/go-zakat-fe/...)
            {
                source: '/:path*', // Tangkap semua halaman
                destination: 'https://www.muhdila.com/go-zakat-fe/:path*', // Lempar ke domain utama
                permanent: false,
                // KUNCI AJAIBNYA DI SINI:
                // Rule ini HANYA jalan kalau header 'x-forwarded-host' TIDAK ADA.
                // (Artinya akses langsung, bukan via rewrite muhdila.com)
                missing: [
                    {
                        type: 'header',
                        key: 'x-forwarded-host',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // TODO Hapus basePath dan redirects jika dalam proses dev (lokal)

    // Base path tetap ada agar aplikasi berjalan di /go-zakat
    basePath: '/go-zakat',

    async redirects() {
        return [
            // 1. Menangani halaman root kosong (https://go-zakat.vercel.app/)
            {
                source: '/',
                destination: 'https://www.muhdila.com/go-zakat',
                basePath: false,
                permanent: false,
            },
            // 2. Menangani semua halaman dalam (misal: /dashboard, /login)
            {
                source: '/:path*',
                destination: 'https://www.muhdila.com/go-zakat/:path*',
                basePath: false,
                permanent: false,
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
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // Base path tetap aktif
    basePath: '/go-zakat',

    async redirects() {
        return [
            // 1. Tangkap halaman root (go-zakat.vercel.app/)
            {
                source: '/',
                destination: 'https://www.muhdila.com/go-zakat',
                basePath: false,
                permanent: false,
                // Redirect HANYA jika host-nya adalah go-zakat.vercel.app
                has: [
                    {
                        type: 'header',
                        key: 'x-forwarded-host',
                        value: 'go-zakat.vercel.app',
                    },
                ],
            },
            // 2. Tangkap halaman dalam (go-zakat.vercel.app/dashboard)
            {
                source: '/:path*',
                destination: 'https://www.muhdila.com/go-zakat/:path*',
                basePath: false, // PENTING: Supaya menangkap path tanpa prefix /go-zakat
                permanent: false,
                // Redirect HANYA jika host-nya adalah go-zakat.vercel.app
                has: [
                    {
                        type: 'header',
                        key: 'x-forwarded-host',
                        value: 'go-zakat.vercel.app',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
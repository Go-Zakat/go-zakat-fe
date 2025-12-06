import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Configures the allowed origins for development server (Cross-Origin)
    // This resolves "Blocked cross-origin request" on mobile devices
    allowedDevOrigins: [
        'localhost:3000',
        '192.168.1.9:3000',
        '192.168.1.9',
    ],
    output: 'standalone',
};

export default nextConfig;
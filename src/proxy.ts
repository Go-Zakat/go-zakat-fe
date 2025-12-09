import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Daftar route yang harus terproteksi (harus login)
const protectedRoutes = [
    '/dashboard',
    '/asnaf',
    '/mustahiq',
    '/muzakki',
    '/program',
    '/donation-receipt',
    '/distribution',
    '/report',
    '/user',
];

// Daftar route publik (untuk auth seperti login/register)
const publicRoutes = ['/login', '/register'];

export function proxy(request: NextRequest) {
    // Ambil token dari cookies
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // Cek apakah route yang diakses adalah route yang terproteksi
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Cek apakah route yang diakses adalah route publik (auth)
    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Redirect ke login jika akses route terproteksi tanpa token
    // KECUALI jika ada access_token di query params (callback dari Google Auth)
    const hasAccessTokenParam = request.nextUrl.searchParams.has('access_token');

    if (isProtectedRoute && !token && !hasAccessTokenParam) {
        const loginUrl = new URL('/login', request.url);
        // loginUrl.searchParams.set('from', pathname); // Optional: simpan halaman asal untuk redirect setelah login
        return NextResponse.redirect(loginUrl);
    }

    // Redirect ke dashboard jika akses route publik (login/register) tapi sudah ada token
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Lanjutkan request jika tidak ada kondisi di atas yang terpenuhi
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match semua request path kecuali yang dimulai dengan:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images, icons (public folder assets)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
    ],
};

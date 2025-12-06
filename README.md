# Go Zakat Frontend

Aplikasi web frontend untuk manajemen Zakat, Infaq, dan Shodaqoh, dibangun menggunakan Next.js 16 (App Router) dan TypeScript.

## 🚀 Teknologi

Project ini menggunakan stack teknologi modern:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (untuk Tooltip & Transisi)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context / Hooks

## ✨ Fitur Utama

- **Autentikasi**:
  - Login & Register dengan Email/Password
  - Google OAuth Integration
  - Logout
  - Token Management (Access & Refresh Token)
  - Protected Routes (Middleware/Proxy)
- **Manajemen Asnaf**:
  - CRUD Asnaf (Create, Read, Update, Delete)
  - Pencarian Real-time (Debounced)
  - Pagination
  - View Detail Asnaf
- **UI/UX Modern**:
  - Responsive Design
  - Dark Mode Support
  - Interactive Components (Tooltip, Modal, Toast)
  - Collapsible Sidebar with Animation

## 📂 Struktur Project

Project ini menggunakan arsitektur **Clean Architecture** yang modular:

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public routes (Login, Register)
│   ├── (protected)/       # Protected routes (Dashboard, Asnaf)
│   └── layout.tsx         # Root layout
├── modules/               # Feature modules
│   └── feature/           # Feature module
│       ├── application/   # Business Logic Hook
│       ├── domain/        # Types, Interfaces & Zod Schemas
│       ├── infrastructure/# API Services
│       └── presentation/  # UI Layer
│           ├── components/# Presentational Components (View)
│           └── hooks/     # Controllers (ViewModel/Controller Logic)
├── shared/                # Shared utilities & components
│   ├── api/               # HTTP client & Axios Interceptors
│   ├── config/            # Environment & Constants
│   ├── hooks/             # Shared Hooks (useDebounce)
│   ├── lib/               # Helper libraries (authStorage)
│   └── ui/                # Reusable UI Components
│       ├── components/    # Atomic Components (Button, Input, Card, Modal, Tooltip)
│       └── layout/        # Layout Components (Sidebar, PageHeader)
└── proxy.ts               # Middleware for route protection
```

### Pola Desain (Design Pattern)

Kami memisahkan **Logic** dan **View** menggunakan pola Controller/ViewModel pada layer Presentation:

- **Components (`presentation/components`)**: Komponen "bodoh" yang hanya bertugas merender UI. Menerima data dan handler via props atau hook controller.
- **Controllers (`presentation/hooks`)**: Custom hooks yang menangani logic state, form handling, dan memanggil layer application. Contoh: `useAsnafListController`.

## 🛠️ Cara Menjalankan

### Prasyarat

- Node.js (v18 atau lebih baru)
- npm atau yarn
- Backend API yang sudah berjalan (Go Zakat Backend)

### Instalasi

1. Clone repository ini:
   ```bash
   git clone <repository-url>
   cd go-zakat-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Buat file `.env.local` di root project dan tambahkan:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
   *Sesuaikan URL dengan alamat backend Anda.*

4. Jalankan Development Server:
   ```bash
   npm run dev
   // atau
   npm run dev -- --turbopack
   ```

5. Buka browser dan akses [http://localhost:3000](http://localhost:3000).

## 📝 Konvensi Kode

- **Bahasa**: Komentar kode menggunakan Bahasa Indonesia.
- **Import**: Menggunakan absolute path alias `@/src/...`.
- **Naming**: PascalCase untuk Component, camelCase untuk fungsi/variabel.
- **Architecture**: Ikuti struktur Clean Architecture yang telah ditetapkan.

## 🤝 Kontribusi

Silakan buat Issue atau Pull Request jika ingin berkontribusi pada project ini.

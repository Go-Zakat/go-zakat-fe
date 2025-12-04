'use client';

import { Suspense } from 'react';
import { AsnafStats } from '@/src/modules/asnaf/presentation/components/AsnafStats';
import { AsnafList } from '@/src/modules/asnaf/presentation/components/AsnafList';

function AsnafContent() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Daftar Asnaf</h1>
                <p className="text-gray-500">Kelola data kategori asnaf penerima zakat</p>
            </div>

            <AsnafStats />
            <AsnafList />
        </div>
    );
}

export default function AsnafPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AsnafContent />
        </Suspense>
    );
}

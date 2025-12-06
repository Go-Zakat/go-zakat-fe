'use client';

import { Suspense } from 'react';
import { MuzakkiCreateForm } from '@/src/modules/muzakki/presentation/components/MuzakkiCreateForm';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';

function CreateMuzakkiContent() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Tambah Muzakki"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Daftar Muzakki', href: '/muzakki' },
                    { label: 'Tambah Muzakki' }
                ]}
            />

            <MuzakkiCreateForm />
        </div>
    );
}

export default function CreateMuzakkiPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateMuzakkiContent />
        </Suspense>
    );
}

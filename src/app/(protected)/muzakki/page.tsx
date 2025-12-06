'use client';

import { Suspense } from 'react';
import { MuzakkiList } from '@/src/modules/muzakki/presentation/components/MuzakkiList';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';

function MuzakkiContent() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Daftar Muzakki"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Daftar Muzakki' }
                ]}
            />

            <MuzakkiList />
        </div>
    );
}

export default function MuzakkiPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MuzakkiContent />
        </Suspense>
    );
}

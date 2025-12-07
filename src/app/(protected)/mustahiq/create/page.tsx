'use client';

import { Suspense } from 'react';
import { MustahiqCreateForm } from '@/src/modules/mustahiq/presentation/components/MustahiqCreateForm';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';

function CreateMustahiqContent() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Tambah Mustahiq"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Tambah Mustahiq' }
                ]}
            />

            <MustahiqCreateForm />
        </div>
    );
}

export default function CreateMustahiqPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateMustahiqContent />
        </Suspense>
    );
}

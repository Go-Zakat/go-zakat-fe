'use client';

import { Suspense } from 'react';
import { AsnafCreateForm } from '@/src/modules/asnaf/presentation/components/AsnafCreateForm';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';

function CreateAsnafContent() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Tambah Asnaf"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Tambah Asnaf' }
                ]}
            />

            <AsnafCreateForm />
        </div>
    );
}

export default function CreateAsnafPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateAsnafContent />
        </Suspense>
    );
}

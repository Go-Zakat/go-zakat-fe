'use client';

import { Suspense } from 'react';
import { ProgramCreateForm } from '@/src/modules/program/presentation/components/ProgramCreateForm';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';

function CreateProgramContent() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Tambah Program"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Tambah Program' }
                ]}
            />

            <ProgramCreateForm />
        </div>
    );
}

export default function CreateProgramPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateProgramContent />
        </Suspense>
    );
}

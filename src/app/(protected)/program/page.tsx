'use client';

import { Suspense } from 'react';
import { ProgramList } from '@/src/modules/program/presentation/components/ProgramList';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';

function ProgramContent() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Daftar Program"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Daftar Program' }
                ]}
            />

            <ProgramList />
        </div>
    );
}

export default function ProgramPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProgramContent />
        </Suspense>
    );
}

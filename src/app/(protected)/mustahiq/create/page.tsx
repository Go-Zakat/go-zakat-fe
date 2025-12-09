'use client';

import { Suspense } from 'react';
import { MustahiqCreateForm } from '@/src/modules/mustahiq/presentation/components/MustahiqCreateForm';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

function CreateMustahiqContent() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Tambah Mustahiq"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Tambah Mustahiq' }
                ]}
            />

            <MustahiqCreateForm />
        </AnimatedContainer>
    );
}

export default function CreateMustahiqPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateMustahiqContent />
        </Suspense>
    );
}

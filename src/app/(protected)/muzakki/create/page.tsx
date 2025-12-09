'use client';

import { Suspense } from 'react';
import { MuzakkiCreateForm } from '@/src/modules/muzakki/presentation/components/MuzakkiCreateForm';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

function CreateMuzakkiContent() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Tambah Muzakki"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Tambah Muzakki' }
                ]}
            />

            <MuzakkiCreateForm />
        </AnimatedContainer>
    );
}

export default function CreateMuzakkiPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateMuzakkiContent />
        </Suspense>
    );
}

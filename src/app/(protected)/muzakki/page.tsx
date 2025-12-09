'use client';

import { Suspense } from 'react';
import { MuzakkiList } from '@/src/modules/muzakki/presentation/components/MuzakkiList';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

function MuzakkiContent() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Daftar Muzakki"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Daftar Muzakki' }
                ]}
            />

            <MuzakkiList />
        </AnimatedContainer>
    );
}

export default function MuzakkiPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MuzakkiContent />
        </Suspense>
    );
}

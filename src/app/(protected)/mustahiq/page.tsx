'use client';

import { Suspense } from 'react';
import { MustahiqList } from '@/src/modules/mustahiq/presentation/components/MustahiqList';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

function MustahiqContent() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Daftar Mustahiq"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Daftar Mustahiq' }
                ]}
            />

            <MustahiqList />
        </AnimatedContainer>
    );
}

export default function MustahiqPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MustahiqContent />
        </Suspense>
    );
}

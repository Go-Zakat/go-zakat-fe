'use client';

import { Suspense } from 'react';
import { AsnafList } from '@/src/modules/asnaf/presentation/components/AsnafList';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

function AsnafContent() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Daftar Asnaf"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Daftar Asnaf' }
                ]}
            />

            <AsnafList />
        </AnimatedContainer>
    );
}

export default function AsnafPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AsnafContent />
        </Suspense>
    );
}

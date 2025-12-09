'use client';

import { Suspense } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";
import {DistributionList} from "@/src/modules/distribution/presentation/components/DistributionList";

function DistributionContent() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Daftar Penyaluran"
                breadcrumbs={[
                    { label: 'Operasional' },
                    { label: 'Penyaluran' }
                ]}
            />

            <DistributionList />
        </AnimatedContainer>
    );
}

export default function DistributionPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DistributionContent />
        </Suspense>
    );
}

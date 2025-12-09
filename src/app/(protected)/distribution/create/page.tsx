'use client';

import { Suspense } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { AnimatedContainer } from "@/src/shared/ui/components/AnimatedContainer";
import {DistributionCreateForm} from "@/src/modules/distribution/presentation/components/DistributionCreateForm";

function CreateDistributionContent() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Buat Penyaluran Baru"
                breadcrumbs={[
                    { label: 'Operasional' },
                    { label: 'Buat Penyaluran Baru' }
                ]}
            />
            <DistributionCreateForm />
        </AnimatedContainer>
    );
}

export default function DistributionCreatePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateDistributionContent />
        </Suspense>
    );
}
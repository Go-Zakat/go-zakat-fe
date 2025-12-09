'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { DistributionUpdateForm } from '@/src/modules/distribution/presentation/components/DistributionUpdateForm';
import { AnimatedContainer } from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function DistributionEditPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Edit Penyaluran"
                breadcrumbs={[
                    { label: 'Operasional' },
                    { label: 'Edit' }
                ]}
            />
            <DistributionUpdateForm id={id} />
        </AnimatedContainer>
    );
}
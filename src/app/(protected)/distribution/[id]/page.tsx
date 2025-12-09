'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { DistributionDetailView } from '@/src/modules/distribution/presentation/components/DistributionDetailView';
import { AnimatedContainer } from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function DistributionDetailPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Detail Penyaluran"
                breadcrumbs={[
                    { label: 'Operasional' },
                    { label: 'Detail' }
                ]}
            />
            <DistributionDetailView id={id} />
        </AnimatedContainer>
    );
}
'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { MustahiqDetailView } from '@/src/modules/mustahiq/presentation/components/MustahiqDetailView';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function MustahiqDetailPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Detail Mustahiq"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Detail Mustahiq' },
                ]}
            />

            <MustahiqDetailView id={id} />
        </AnimatedContainer>
    );
}

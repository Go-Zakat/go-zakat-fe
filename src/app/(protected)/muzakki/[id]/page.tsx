'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { MuzakkiDetailView } from '@/src/modules/muzakki/presentation/components/MuzakkiDetailView';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function MuzakkiDetailPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Detail Muzakki"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Detail Muzakki' },
                ]}
            />

            <MuzakkiDetailView id={id} />
        </AnimatedContainer>
    );
}

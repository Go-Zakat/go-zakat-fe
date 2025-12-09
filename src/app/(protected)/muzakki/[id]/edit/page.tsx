'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { MuzakkiUpdateForm } from '@/src/modules/muzakki/presentation/components/MuzakkiUpdateForm';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function MuzakkiEditPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Edit Muzakki"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Edit Muzakki' }
                ]}
            />

            <MuzakkiUpdateForm id={id} />
        </AnimatedContainer>
    );
}

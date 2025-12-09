'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { MustahiqUpdateForm } from '@/src/modules/mustahiq/presentation/components/MustahiqUpdateForm';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function MustahiqEditPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Edit Mustahiq"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Edit Mustahiq' }
                ]}
            />

            <MustahiqUpdateForm id={id} />
        </AnimatedContainer>
    );
}

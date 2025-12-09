'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { AsnafUpdateForm } from '@/src/modules/asnaf/presentation/components/AsnafUpdateForm';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function AsnafEditPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Edit Asnaf"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Edit Asnaf' }
                ]}
            />

            <AsnafUpdateForm id={id} />
        </AnimatedContainer>
    );
}

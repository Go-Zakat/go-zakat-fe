'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { ProgramUpdateForm } from '@/src/modules/program/presentation/components/ProgramUpdateForm';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ProgramEditPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Edit Program"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Edit Program' },
                ]}
            />

            <ProgramUpdateForm id={id} />
        </AnimatedContainer>
    );
}

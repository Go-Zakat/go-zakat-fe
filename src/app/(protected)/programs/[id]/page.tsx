'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { ProgramDetailView } from '@/src/modules/program/presentation/components/ProgramDetailView';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ProgramDetailPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Detail Program"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Detail Program' },
                ]}
            />

            <ProgramDetailView id={id} />
        </div>
    );
}

'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { MustahiqDetailView } from '@/src/modules/mustahiq/presentation/components/MustahiqDetailView';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function MustahiqDetailPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Detail Mustahiq"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Detail Mustahiq' },
                ]}
            />

            <MustahiqDetailView id={id} />
        </div>
    );
}

'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { AsnafDetailView } from '@/src/modules/asnaf/presentation/components/AsnafDetailView';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function AsnafDetailPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Detail Asnaf"
                breadcrumbs={[
                    { label: 'Master Data' },
                    { label: 'Detail Asnaf' },
                ]}
            />

            <AsnafDetailView id={id} />
        </div>
    );
}

'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { Card } from '@/src/shared/ui/components/Card';
import { MustahiqUpdateForm } from '@/src/modules/mustahiq/presentation/components/MustahiqUpdateForm';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function MustahiqEditPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Edit Mustahiq"
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Mustahiq', href: '/mustahiq' },
                    { label: 'Edit', href: `/mustahiq/${id}/edit`, active: true },
                ]}
                backUrl="/mustahiq"
            />

            <Card>
                <MustahiqUpdateForm id={id} />
            </Card>
        </div>
    );
}

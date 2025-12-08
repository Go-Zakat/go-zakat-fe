'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { DonationReceiptUpdateForm } from '@/src/modules/donation-receipts/presentation/components/DonationReceiptUpdateForm';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function DonationReceiptEditPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Edit Penerimaan Donasi"
                breadcrumbs={[
                    { label: 'Transaksi' },
                    { label: 'Edit Donasi' }
                ]}
            />
            <DonationReceiptUpdateForm id={id} />
        </div>
    );
}

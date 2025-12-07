'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { DonationReceiptDetailView } from '@/src/modules/donationReceipts/presentation/components/DonationReceiptDetailView';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function DonationReceiptDetailPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Detail Penerimaan Donasi"
                breadcrumbs={[
                    { label: 'Transaksi' },
                    { label: 'Detail Donasi' }
                ]}
            />
            <DonationReceiptDetailView id={id} />
        </div>
    );
}

'use client';

import { Suspense } from 'react';
import { DonationReceiptList } from '@/src/modules/donation-receipts/presentation/components/DonationReceiptList';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';

function DonationReceiptContent() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Penerimaan Donasi"
                breadcrumbs={[
                    { label: 'Transaksi' },
                    { label: 'Penerimaan Donasi' }
                ]}
            />

            <DonationReceiptList />
        </div>
    );
}

export default function DonationReceiptPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DonationReceiptContent />
        </Suspense>
    );
}

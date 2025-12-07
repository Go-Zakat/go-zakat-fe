'use client';

import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { DonationReceiptCreateForm } from '@/src/modules/donationReceipts/presentation/components/DonationReceiptCreateForm';

export default function DonationReceiptCreatePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Buat Penerimaan Donasi"
                breadcrumbs={[
                    { label: 'Transaksi' },
                    { label: 'Buat Donasi Baru' }
                ]}
            />
            <DonationReceiptCreateForm />
        </div>
    );
}

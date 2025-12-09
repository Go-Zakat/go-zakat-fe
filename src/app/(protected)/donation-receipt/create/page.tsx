'use client';

import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { DonationReceiptCreateForm } from '@/src/modules/donation-receipt/presentation/components/DonationReceiptCreateForm';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

export default function DonationReceiptCreatePage() {
    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Buat Penerimaan Donasi"
                breadcrumbs={[
                    { label: 'Transaksi' },
                    { label: 'Buat Donasi Baru' }
                ]}
            />
            <DonationReceiptCreateForm />
        </AnimatedContainer>
    );
}

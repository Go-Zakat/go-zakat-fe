'use client';

import { use } from 'react';
import { PageHeader } from '@/src/shared/ui/layout/PageHeader';
import { DonationReceiptDetailView } from '@/src/modules/donation-receipts/presentation/components/DonationReceiptDetailView';
import {AnimatedContainer} from "@/src/shared/ui/components/AnimatedContainer";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function DonationReceiptDetailPage({ params }: PageProps) {
    const { id } = use(params);

    return (
        <AnimatedContainer className="space-y-6">
            <PageHeader
                title="Detail Penerimaan Donasi"
                breadcrumbs={[
                    { label: 'Transaksi' },
                    { label: 'Detail Donasi' }
                ]}
            />
            <DonationReceiptDetailView id={id} />
        </AnimatedContainer>
    );
}

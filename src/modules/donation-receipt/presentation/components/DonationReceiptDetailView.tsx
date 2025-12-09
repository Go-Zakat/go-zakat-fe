'use client';

import Link from 'next/link';
import { Edit, Calendar, CalendarCheck, User, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { useDonationReceiptDetailController } from '../hooks/useDonationReceiptDetailController';
import { PAYMENT_METHODS } from '@/src/shared/config/constants';

interface DonationReceiptDetailViewProps {
    id: string;
}

// Helper untuk label Payment Method
const getPaymentMethodLabel = (method: string | undefined) => {
    if (!method) return '-';

    const labels: Record<string, string> = {
        [PAYMENT_METHODS.CASH]: 'Tunai',
        [PAYMENT_METHODS.BANK_TRANSFER]: 'Transfer Bank',
        [PAYMENT_METHODS.E_WALLET]: 'E-Wallet',
        [PAYMENT_METHODS.QRIS]: 'QRIS',
    };

    return labels[method] || method.replace(/_/g, ' ');
};

export const DonationReceiptDetailView = ({ id }: DonationReceiptDetailViewProps) => {
    const { donationReceipt, isLoading, error } = useDonationReceiptDetailController(id);

    if (isLoading) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Memuat detail penerimaan...</div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-red-500 dark:text-red-400">Terjadi kesalahan: {error}</div>
            </Card>
        );
    }

    if (!donationReceipt) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Data penerimaan tidak ditemukan</div>
            </Card>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                {/* Header */}
                <div className="p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 dark:bg-dark-main/50">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No. Kwitansi</p>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{donationReceipt.receipt_number}</h2>
                    </div>
                    <div className="flex flex-col sm:items-end">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Penerimaan</p>
                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(donationReceipt.total_amount)}
                        </h2>
                    </div>
                    <Link href={`/donation-receipts/${donationReceipt.id}/edit`} className="w-full sm:w-auto">
                        <Button className="w-full">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <div className="p-6 space-y-8">
                    {/* General Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                    <CalendarCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Penerimaan</p>
                                    <p className="font-medium text-gray-900 dark:text-text-primary">
                                        {formatDate(donationReceipt.receipt_date)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Nama Muzakki</p>
                                    <p className="font-medium text-gray-900 dark:text-text-primary">
                                        {donationReceipt.muzakki?.full_name || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Metode Pembayaran</p>
                                    {/* MENGGUNAKAN HELPER DISINI */}
                                    <p className="font-medium text-gray-900 dark:text-text-primary capitalize">
                                        {getPaymentMethodLabel(donationReceipt.payment_method)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Catatan</p>
                                    <p className="font-medium text-gray-900 dark:text-text-primary">
                                        {donationReceipt.notes || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4">Detail Item Donasi</h3>
                        <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-dark-main text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-dark-border">
                                <tr>
                                    <th className="px-4 py-3">Jenis Dana</th>
                                    <th className="px-4 py-3">Detail Zakat</th>
                                    <th className="px-4 py-3">Catatan Item</th>
                                    <th className="px-4 py-3 text-right">Nominal</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                                {donationReceipt.items?.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-main/50">
                                        <td className="px-4 py-3 font-medium capitalize">
                                            {item.fund_type}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.fund_type === 'zakat' ? (
                                                <div className="flex flex-col text-xs space-y-1">
                                                        <span className="capitalize font-semibold text-gray-700 dark:text-gray-300">
                                                            {item.zakat_type || '-'}
                                                        </span>
                                                    {item.zakat_type === 'fitrah' && (
                                                        <div className="text-gray-500">
                                                            {item.person_count && <span>{item.person_count} Jiwa</span>}
                                                            {item.person_count && item.rice_kg && <span> • </span>}
                                                            {item.rice_kg && <span>{item.rice_kg} Kg Beras</span>}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                                            {item.notes || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-text-primary">
                                            {formatCurrency(item.amount)}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row gap-6 border-t border-gray-100 dark:border-dark-border pt-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Dibuat Pada</p>
                                <p className="font-medium">
                                    {new Date(donationReceipt.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
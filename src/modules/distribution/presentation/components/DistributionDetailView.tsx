'use client';

import Link from 'next/link';
import { Edit, Calendar, Tag, FileText, Send, User } from 'lucide-react';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { useDistributionDetailController } from '../hooks/useDistributionDetailController';
import { Tooltip } from '@/src/shared/ui/components/Tooltip';
import { usePermission } from '@/src/shared/hooks/usePermission';

interface DistributionDetailViewProps {
    id: string;
}

export const DistributionDetailView = ({ id }: DistributionDetailViewProps) => {
    const { distribution, isLoading, error } = useDistributionDetailController(id);
    const { can } = usePermission();

    if (isLoading) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400 animate-pulse">Memuat detail penyaluran...</div>
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

    if (!distribution) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Data penyaluran tidak ditemukan</div>
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
                        <div className="flex items-center gap-2 mb-1">
                            <Send className="w-4 h-4 text-blue-500" />
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Penyaluran Dana</p>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                            {distribution.program?.name || 'Program Umum'}
                        </h2>
                    </div>
                    <div className="flex flex-col sm:items-end">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Disalurkan</p>
                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(distribution.total_amount)}
                        </h2>
                    </div>
                    {can('update', 'distribution') ? (
                        <Link href={`/distribution/${distribution.id}/edit`} className="w-full sm:w-auto">
                            <Button className="w-full shadow-sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                    ) : (
                        <div className="w-full sm:w-auto cursor-not-allowed opacity-50">
                            <Tooltip content="Anda tidak memiliki akses untuk fitur ini">
                                <div>
                                    <Button className="w-full shadow-sm" disabled>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </div>
                            </Tooltip>
                        </div>
                    )}
                </div>

                <div className="lg:px-6 space-y-8">
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Penyaluran</p>
                                    <p className="font-medium text-gray-900 dark:text-text-primary">
                                        {formatDate(distribution.distribution_date)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Sumber Dana</p>
                                    <p className="font-medium text-gray-900 dark:text-text-primary capitalize">
                                        {distribution.source_fund_type?.replace('_', ' ')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Catatan</p>
                                    <p className="font-medium text-gray-900 dark:text-text-primary">
                                        {distribution.notes || '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Dibuat Oleh</p>
                                    <p className="font-medium text-gray-900 dark:text-text-primary">
                                        {distribution.created_by_user?.full_name || 'System'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary mb-4">
                            Detail Penerima (Mustahiq)
                        </h3>
                        <div className="border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <div className="min-w-[800px]">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 dark:bg-dark-main text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-dark-border">
                                            <tr>
                                                <th className="px-4 py-3">Nama Mustahiq</th>
                                                <th className="px-4 py-3">Asnaf</th>
                                                <th className="px-4 py-3">Catatan</th>
                                                <th className="px-4 py-3 text-right">Nominal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                                            {distribution.items?.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-main/50">
                                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-text-primary">
                                                        {item.mustahiq_name || '-'}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                            {item.asnaf_name || '-'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                                                        {item.notes || '-'}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-text-primary">
                                                        {formatCurrency(item.amount)}
                                                    </td>
                                                </tr>
                                            ))}
                                            {(!distribution.items || distribution.items.length === 0) && (
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                        Tidak ada data penerima
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
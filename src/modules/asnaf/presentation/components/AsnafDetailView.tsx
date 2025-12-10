'use client';

import Link from 'next/link';
import { Edit, Calendar, Clock } from 'lucide-react';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { useAsnafDetailController } from "@/src/modules/asnaf/presentation/hooks/useAsnafDetailController";

interface AsnafDetailViewProps {
    id: string;
}

export const AsnafDetailView = ({ id }: AsnafDetailViewProps) => {
    const { asnaf, isLoading, error } = useAsnafDetailController(id);

    if (isLoading) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Memuat detail asnaf...</div>
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

    if (!asnaf) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Data asnaf tidak ditemukan</div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="pb-6 border-b border-gray-100 dark:border-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-primary-blue/20 text-blue-600 dark:text-primary-blue flex items-center justify-center text-lg font-bold">
                            {asnaf.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{asnaf.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ID: {asnaf.id}</p>
                        </div>
                    </div>
                    <Link href={`/asnaf/${asnaf.id}/edit`} className="w-full sm:w-auto">
                        <Button className="w-full">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Deskripsi
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            {asnaf.description || '-'}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Dibuat Pada</p>
                                <p className="font-medium">
                                    {new Date(asnaf.createdAt).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Terakhir Diupdate</p>
                                <p className="font-medium">
                                    {new Date(asnaf.updatedAt).toLocaleDateString('id-ID', {
                                        weekday: 'long',
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

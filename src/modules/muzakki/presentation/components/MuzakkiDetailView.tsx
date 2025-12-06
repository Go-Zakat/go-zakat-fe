'use client';

import Link from 'next/link';
import { Edit, Calendar, Clock, Phone, MapPin, FileText } from 'lucide-react';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { useMuzakkiDetailController } from "@/src/modules/muzakki/presentation/hooks/useMuzakkiDetailController";

interface MuzakkiDetailViewProps {
    id: string;
}

export const MuzakkiDetailView = ({ id }: MuzakkiDetailViewProps) => {
    const { muzakki, isLoading, error } = useMuzakkiDetailController(id);

    if (isLoading) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Memuat detail muzakki...</div>
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

    if (!muzakki) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Data muzakki tidak ditemukan</div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="pb-6 border-b border-gray-100 dark:border-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-primary-blue/20 text-blue-600 dark:text-primary-blue flex items-center justify-center text-lg font-bold shrink-0">
                            {muzakki.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{muzakki.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ID: {muzakki.id}</p>
                        </div>
                    </div>
                    <Link href={`/muzakki/${muzakki.id}/edit`} className="w-full sm:w-auto">
                        <Button className="w-full">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                Informasi Kontak
                            </h3>
                            <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Nomor Telepon</p>
                                        <p className="text-gray-900 dark:text-gray-200 font-medium">{muzakki.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">Alamat</p>
                                        <p className="text-gray-900 dark:text-gray-200 font-medium">{muzakki.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                Catatan
                            </h3>
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <FileText className="w-4 h-4 text-gray-400 mt-1" />
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {muzakki.notes || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 border-t border-gray-100 dark:border-dark-border pt-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Dibuat Pada</p>
                                <p className="font-medium">
                                    {new Date(muzakki.createdAt).toLocaleDateString('id-ID', {
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
                                    {new Date(muzakki.updatedAt).toLocaleDateString('id-ID', {
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

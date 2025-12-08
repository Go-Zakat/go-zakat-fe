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
                <div className="text-gray-500 dark:text-gray-400 animate-pulse">Memuat detail muzakki...</div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
                    Terjadi kesalahan: {error}
                </div>
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
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 dark:bg-dark-main/50">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-primary-blue/20 text-blue-600 dark:text-primary-blue flex items-center justify-center text-2xl font-bold border-2 border-white dark:border-dark-paper shadow-sm">
                            {muzakki.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{muzakki.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">ID: {muzakki.id.substring(0, 8)}</p>
                        </div>
                    </div>
                    <Link href={`/muzakki/${muzakki.id}/edit`} className="w-full sm:w-auto">
                        <Button className="w-full shadow-sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Data
                        </Button>
                    </Link>
                </div>

                <div className="p-6 space-y-8">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Column 1: Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-500" />
                                Kontak & Alamat
                            </h3>
                            <div className="bg-white dark:bg-dark-main border border-gray-100 dark:border-dark-border rounded-xl p-4 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 mt-1">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Nomor Telepon</p>
                                        <p className="font-medium text-gray-900 dark:text-text-primary">
                                            {muzakki.phoneNumber || '-'}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-50 dark:border-dark-border" />
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 mt-1">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Alamat Lengkap</p>
                                        <p className="font-medium text-gray-900 dark:text-text-primary leading-relaxed">
                                            {muzakki.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Notes */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-500" />
                                Catatan
                            </h3>
                            <div className="bg-white dark:bg-dark-main border border-gray-100 dark:border-dark-border rounded-xl p-4 h-full">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {muzakki.notes || <span className="text-gray-400 italic">Tidak ada catatan tambahan.</span>}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-dark-border">
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
                                        year: 'numeric'
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
                                        year: 'numeric'
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
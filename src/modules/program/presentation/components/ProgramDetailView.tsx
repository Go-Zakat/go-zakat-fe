'use client';

import Link from 'next/link';
import { Edit, Calendar, Clock, Tag, CheckCircle, XCircle, Info } from 'lucide-react';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { useProgramDetailController } from '../hooks/useProgramDetailController';

interface ProgramDetailViewProps {
    id: string;
}

export const ProgramDetailView = ({ id }: ProgramDetailViewProps) => {
    const { program, isLoading, error } = useProgramDetailController(id);

    if (isLoading) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400 animate-pulse">Memuat detail program...</div>
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

    if (!program) {
        return (
            <Card className="p-8 flex justify-center items-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Data program tidak ditemukan</div>
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
                            {program.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{program.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">ID: {program.id.substring(0, 8)}</p>
                        </div>
                    </div>
                    <Link href={`/program/${program.id}/edit`} className="w-full sm:w-auto">
                        <Button className="w-full shadow-sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Data
                        </Button>
                    </Link>
                </div>

                <div className="p-6 space-y-8">
                    {/* Status & Type Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-100 dark:border-dark-border rounded-xl p-4 flex items-center gap-4 bg-white dark:bg-dark-main">
                            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                                <Tag className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tipe Program</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{program.type}</p>
                            </div>
                        </div>

                        <div className="border border-gray-100 dark:border-dark-border rounded-xl p-4 flex items-center gap-4 bg-white dark:bg-dark-main">
                            <div className={`p-3 rounded-lg ${program.active ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                                {program.active ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status Keaktifan</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {program.active ? 'Aktif' : 'Tidak Aktif'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <Info className="w-4 h-4 text-gray-500" />
                            <h3>Deskripsi Program</h3>
                        </div>
                        <div className="bg-gray-50 dark:bg-dark-main/50 p-5 rounded-xl border border-gray-100 dark:border-dark-border text-gray-700 dark:text-gray-300 leading-relaxed">
                            {program.description || (
                                <span className="text-gray-400 italic">Tidak ada deskripsi tersedia.</span>
                            )}
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-dark-border">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Dibuat Pada</p>
                                <p className="font-medium">
                                    {new Date(program.createdAt).toLocaleDateString('id-ID', {
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
                                    {new Date(program.updatedAt).toLocaleDateString('id-ID', {
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
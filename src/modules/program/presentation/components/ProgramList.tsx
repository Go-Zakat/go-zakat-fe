'use client';

import {
    Eye,
    Edit,
    Trash2,
    Search,
    Plus,
    AlertTriangle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/shared/ui/components/Button';
import { Input } from '@/src/shared/ui/components/Input';
import { Select } from '@/src/shared/ui/components/Select';
import { Modal } from '@/src/shared/ui/components/Modal';
import { useProgramListController } from '@/src/modules/program/presentation/hooks/useProgramListController';
import { Pagination } from "@/src/shared/ui/components/Pagination";
import { Table, Column } from "@/src/shared/ui/components/Table";

export const ProgramList = () => {
    const router = useRouter();

    const {
        items,
        meta,
        isLoading,
        isDeleting,
        search,
        typeFilter,
        activeFilter,
        availableTypes,
        page,
        perPage,
        isDeleteModalOpen,
        setSearch,
        setTypeFilter,
        setActiveFilter,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete
    } = useProgramListController();

    // --- Definisi Kolom ---
    const columns: Column<typeof items[0]>[] = [
        {
            header: 'Nama Program',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-primary-blue/20 text-blue-600 dark:text-primary-blue flex items-center justify-center text-xs font-bold shrink-0">
                        {item.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-text-primary">{item.name}</span>
                </div>
            ),
            className: "w-[50%]"
        },
        {
            header: 'Tipe',
            cell: (item) => (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-300">
                    {item.type}
                </span>
            ),
            className: "w-[15%]"
        },
        {
            header: 'Status',
            cell: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.active
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}>
                    {item.active ? 'Aktif' : 'Tidak Aktif'}
                </span>
            ),
            className: "w-[15%]"
        },
        {
            header: 'Tanggal Dibuat',
            cell: (item) => (
                <span className="text-sm text-gray-500 dark:text-text-secondary">
                    {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </span>
            ),
            className: "w-[20%] whitespace-nowrap"
        },
        {
            header: 'Aksi',
            cell: (item) => (
                <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-primary-blue/10 text-blue-600 dark:text-primary-blue" title="Edit" onClick={() => router.push(`/program/${item.id}/edit`)}>
                        <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon"
                            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-dark-border text-gray-600 dark:text-text-secondary"
                            title="Detail"
                            onClick={() => router.push(`/program/${item.id}`)}
                    >
                        <Eye size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                        title="Hapus"
                        onClick={() => handleOpenDeleteModal(item.id)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ),
            className: "w-[20%] text-right",
            headerClassName: "text-right"
        }
    ];

    return (
        <>
            <div className="bg-white dark:bg-dark-paper rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[1000px]">
                        {/* Action Bar */}
                        <div className="p-6 flex flex-row gap-4 justify-between items-center">
                            <div className="flex flex-row gap-3 w-auto">
                                <div className="w-64">
                                    <Input
                                        placeholder="Cari Program..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        startIcon={<Search size={18} />}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-40">
                                    <Select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        options={[
                                            { value: '', label: 'Semua Tipe' },
                                            ...availableTypes.map(type => ({
                                                value: type,
                                                label: type
                                            }))
                                        ]}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-40">
                                    <Select
                                        value={activeFilter}
                                        onChange={(e) => setActiveFilter(e.target.value)}
                                        options={[
                                            { value: '', label: 'Semua Status' },
                                            { value: 'true', label: 'Aktif' },
                                            { value: 'false', label: 'Tidak Aktif' }
                                        ]}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={() => router.push('/program/create')}
                                className="w-auto"
                                size="md"
                            >
                                <Plus size={18} />
                                Tambah Program
                            </Button>
                        </div>

                        {/* REFACTOR: Table Component */}
                        <Table
                            columns={columns}
                            data={items}
                            isLoading={isLoading}
                            keyExtractor={(item) => item.id}
                            emptyMessage="Belum ada data program"
                        />

                        {/* REFACTOR: Pagination Component */}
                        <Pagination
                            page={page}
                            perPage={perPage}
                            totalItems={meta?.total || 0}
                            totalPages={meta?.total_page || 1}
                            isLoading={isLoading}
                            onPageChange={handlePageChange}
                            onPerPageChange={handlePerPageChange}
                        />
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                title="Hapus Program"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <AlertTriangle className="h-6 w-6 shrink-0" />
                        <p className="text-sm">
                            Apakah Anda yakin ingin menghapus program ini? Data yang dihapus tidak dapat dikembalikan.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            variant="outline"
                            onClick={handleCloseDeleteModal}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button
                            className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700"
                            onClick={handleConfirmDelete}
                            isLoading={isDeleting}
                        >
                            Hapus
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
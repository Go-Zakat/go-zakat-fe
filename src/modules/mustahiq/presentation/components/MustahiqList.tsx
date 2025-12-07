'use client';

import {
    Eye,
    Edit,
    Trash2,
    Search,
    Plus,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/shared/ui/components/Button';
import { Input } from '@/src/shared/ui/components/Input';
import { Select } from '@/src/shared/ui/components/Select';
import { Modal } from '@/src/shared/ui/components/Modal';
import { useMustahiqListController } from '@/src/modules/mustahiq/presentation/hooks/useMustahiqListController';
import { MUSTAHIQ_STATUS } from '@/src/shared/config/constants';

export const MustahiqList = () => {
    const router = useRouter();

    const {
        items,
        meta,
        isLoading,
        isDeleting,
        search,
        page,
        perPage,
        isDeleteModalOpen,
        statusFilter,
        asnafFilter,
        asnafList,
        setSearch,
        setStatusFilter,
        setAsnafFilter,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete
    } = useMustahiqListController();

    const statusOptions = [
        { value: '', label: 'Semua Status' },
        { value: MUSTAHIQ_STATUS.ACTIVE, label: 'Aktif' },
        { value: MUSTAHIQ_STATUS.INACTIVE, label: 'Tidak Aktif' },
        { value: MUSTAHIQ_STATUS.PENDING, label: 'Pending' },
    ];

    const asnafOptions = [
        { value: '', label: 'Semua Asnaf' },
        ...asnafList.map(asnaf => ({
            value: asnaf.id,
            label: asnaf.name
        }))
    ];

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case MUSTAHIQ_STATUS.ACTIVE:
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case MUSTAHIQ_STATUS.INACTIVE:
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case MUSTAHIQ_STATUS.PENDING:
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case MUSTAHIQ_STATUS.GRADUATED:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case MUSTAHIQ_STATUS.ACTIVE: return 'Active';
            case MUSTAHIQ_STATUS.INACTIVE: return 'Inactive';
            case MUSTAHIQ_STATUS.PENDING: return 'Pending';
            case MUSTAHIQ_STATUS.GRADUATED: return 'Graduated';
            default: return status;
        }
    }

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
                                        placeholder="Cari Mustahiq..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        startIcon={<Search size={18} />}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-48">
                                    <Select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        options={statusOptions}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-48">
                                    <Select
                                        value={asnafFilter}
                                        onChange={(e) => setAsnafFilter(e.target.value)}
                                        options={asnafOptions}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={() => router.push('/mustahiq/create')}
                                className="w-auto"
                                size="md"
                            >
                                <Plus size={18} />
                                Tambah Mustahiq
                            </Button>
                        </div>

                        {/* Table */}
                        <div className="">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-dark-main/50 border-y border-gray-100 dark:border-dark-border">
                                        <th className="px-6 py-4 text-left w-12">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-primary-blue focus:ring-primary-blue cursor-pointer bg-transparent" />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider min-w-[200px]">Nama Mustahiq</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider whitespace-nowrap">Asnaf</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider whitespace-nowrap">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider whitespace-nowrap w-[200px]">Tanggal Dibuat</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider whitespace-nowrap w-[120px]">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-text-secondary">
                                                Memuat data...
                                            </td>
                                        </tr>
                                    ) : items.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-text-secondary">
                                                Belum ada data mustahiq
                                            </td>
                                        </tr>
                                    ) : (
                                        items.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-main/50">
                                                <td className="px-6 py-4">
                                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-primary-blue focus:ring-primary-blue cursor-pointer bg-transparent" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-primary-blue/20 text-blue-600 dark:text-primary-blue flex items-center justify-center text-xs font-bold">
                                                            {item.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium text-gray-900 dark:text-text-primary">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-secondary">
                                                    {item.asnaf?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    {/* Updated Badge using helper function */}
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                                                        {getStatusLabel(item.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-text-secondary">
                                                    {/* Mobile Date (Short) */}
                                                    <span className="lg:hidden">
                                                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    {/* Desktop Date (Long) */}
                                                    <span className="hidden lg:block">
                                                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-primary-blue/10 text-blue-600 dark:text-primary-blue" title="Edit" onClick={() => router.push(`/mustahiq/${item.id}/edit`)}>
                                                            <Edit size={16} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon"
                                                            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-dark-border text-gray-600 dark:text-text-secondary"
                                                            title="Detail"
                                                            onClick={() => router.push(`/mustahiq/${item.id}`)}
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
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-text-secondary">
                                <span>Rows per page:</span>
                                <select
                                    value={perPage}
                                    onChange={handlePerPageChange}
                                    className="border border-gray-200 dark:border-dark-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer bg-white dark:bg-dark-main text-gray-900 dark:text-text-primary"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-text-secondary">
                                <span>
                                    {(meta?.page || 0) * (meta?.per_page || 0) - (meta?.per_page || 0) + 1}
                                    -
                                    {Math.min((meta?.page || 0) * (meta?.per_page || 0), meta?.total || 0)}
                                    {' '}of{' '}
                                    {meta?.total || 0}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page <= 1 || isLoading}
                                    >
                                        <ChevronLeft size={18} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page >= (meta?.total_page || 1) || isLoading}
                                    >
                                        <ChevronRight size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                title="Hapus Mustahiq"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <AlertTriangle className="h-6 w-6 shrink-0" />
                        <p className="text-sm">
                            Apakah Anda yakin ingin menghapus data mustahiq ini? Data yang dihapus tidak dapat dikembalikan.
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

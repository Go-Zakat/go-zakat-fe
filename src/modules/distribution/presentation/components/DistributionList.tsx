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
import { DateRangePicker } from '@/src/shared/ui/components/DateRangePicker';
import { Pagination } from "@/src/shared/ui/components/Pagination";
import { Table, Column } from "@/src/shared/ui/components/Table";
import { useDistributionListController } from '../hooks/useDistributionListController';

export const DistributionList = () => {
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
        // Ambil state filter yang benar dari controller
        sourceFundFilter,
        programFilter,
        programList,
        setSearch,
        setSourceFundFilter,
        setProgramFilter,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
    } = useDistributionListController();

    // Option Lists
    const sourceFundOptions = [
        { value: '', label: 'Semua Sumber Dana' },
        { value: 'zakat_fitrah', label: 'Zakat Fitrah' },
        { value: 'zakat_maal', label: 'Zakat Maal' },
        { value: 'infaq', label: 'Infaq' },
        { value: 'sadaqah', label: 'Sadaqah' },
    ];

    const programOptions = [
        { value: '', label: 'Semua Program' },
        ...programList.map((p) => ({ value: p.id, label: p.name })),
    ];

    // Formatters
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // Columns Definition
    const columns: Column<typeof items[0]>[] = [
        {
            header: 'Program',
            cell: (item) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-text-primary">
                        {item.program?.name || 'Program Umum'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-text-secondary capitalize">
                        {item.source_fund_type?.replace('_', ' ')}
                    </span>
                </div>
            ),
            className: "w-[30%]"
        },
        {
            header: 'Total Penyaluran',
            cell: (item) => (
                <span className="text-sm font-semibold text-gray-900 dark:text-text-primary">
                    {formatCurrency(item.total_amount)}
                </span>
            ),
            className: 'w-[20%]'
        },
        {
            header: 'Catatan',
            accessorKey: 'notes',
            cell: (item) => (
                <span className="text-sm text-gray-500 dark:text-text-secondary truncate block max-w-[200px]">
                    {item.notes || '-'}
                </span>
            ),
            className: 'w-[20%]'
        },
        {
            header: 'Tanggal',
            cell: (item) => (
                <span className="text-sm text-gray-600 dark:text-text-secondary">
                    {formatDate(item.distribution_date)}
                </span>
            ),
            className: "w-[15%] whitespace-nowrap"
        },
        {
            header: 'Aksi',
            cell: (item) => (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-primary-blue/10 text-blue-600 dark:text-primary-blue"
                        onClick={() => router.push(`/distribution/${item.id}/edit`)}
                        title="Edit"
                    >
                        <Edit size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-dark-border text-gray-600 dark:text-text-secondary"
                        onClick={() => router.push(`/distribution/${item.id}`)}
                        title="Detail"
                    >
                        <Eye size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                        onClick={() => handleOpenDeleteModal(item.id)}
                        title="Hapus"
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ),
            headerClassName: 'text-right',
            className: "w-[15%] text-right"
        }
    ];

    return (
        <>
            <div className="bg-white dark:bg-dark-paper rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[1000px]">
                        {/* Action Bar */}
                        <div className="p-6 space-y-4">
                            {/* Top Row */}
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-3 items-center">
                                    <div className="w-72">
                                        <Input
                                            placeholder="Cari Program / Catatan..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            startIcon={<Search size={18} />}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="w-64">
                                        <DateRangePicker
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(start, end) => {
                                                setStartDate(start);
                                                setEndDate(end);
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <Button
                                    onClick={() => router.push('/distributions/create')}
                                    className="w-auto"
                                    size="md"
                                >
                                    <Plus size={18} />
                                    Buat Penyaluran
                                </Button>
                            </div>

                            {/* Filters Row */}
                            <div className="flex flex-row gap-3 w-auto items-center">
                                <div className="w-48">
                                    <Select
                                        value={programFilter}
                                        onChange={(e) => setProgramFilter(e.target.value)}
                                        options={programOptions}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-48">
                                    <Select
                                        value={sourceFundFilter}
                                        onChange={(e) => setSourceFundFilter(e.target.value)}
                                        options={sourceFundOptions}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <Table
                            columns={columns}
                            data={items}
                            isLoading={isLoading}
                            keyExtractor={(item) => item.id}
                            emptyMessage="Tidak ada data penyaluran"
                        />
                    </div>

                    {/* Pagination */}
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

            {/* Modal Konfirmasi Hapus */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                title="Hapus Penyaluran"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <AlertTriangle className="h-6 w-6 shrink-0" />
                        <p className="text-sm">
                            Apakah Anda yakin ingin menghapus data penyaluran ini? Data yang dihapus tidak dapat dikembalikan.
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
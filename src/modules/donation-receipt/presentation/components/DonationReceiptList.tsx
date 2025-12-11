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
import { useDonationReceiptListController } from '../hooks/useDonationReceiptListController';
import { FUND_TYPES, PAYMENT_METHODS } from '@/src/shared/config/constants';
import { Pagination } from "@/src/shared/ui/components/Pagination";
import { Column, Table } from "@/src/shared/ui/components/Table";

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
        month: 'long',
        year: 'numeric',
    });
};

export const DonationReceiptList = () => {
    const router = useRouter();

    const {
        items,
        meta,
        isLoading,
        isDeleting,
        deleteError,
        search,
        page,
        perPage,
        isDeleteModalOpen,
        fundTypeFilter,
        paymentMethodFilter,
        setSearch,
        setFundTypeFilter,
        setPaymentMethodFilter,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
    } = useDonationReceiptListController();

    const fundTypeOptions = [
        { value: '', label: 'Semua Jenis Dana' },
        { value: FUND_TYPES.ZAKAT, label: 'Zakat' },
        { value: FUND_TYPES.INFAQ, label: 'Infaq' },
        { value: FUND_TYPES.SADAQAH, label: 'Sadaqah' },
    ];

    const paymentMethodOptions = [
        { value: '', label: 'Metode Pembayaran' },
        { value: PAYMENT_METHODS.CASH, label: 'Tunai' },
        { value: PAYMENT_METHODS.BANK_TRANSFER, label: 'Transfer Bank' },
        { value: PAYMENT_METHODS.E_WALLET, label: 'E-Wallet' },
        { value: PAYMENT_METHODS.QRIS, label: 'QRIS' },
    ];

    const columns: Column<typeof items[0]>[] = [
        {
            header: 'No. Kwitansi',
            accessorKey: 'receipt_number',
            className: 'w-[25%] text-sm font-medium text-gray-900 dark:text-text-primary'
        },
        {
            header: 'Muzakki',
            cell: (item) => (
                <span className="text-sm text-gray-900 dark:text-text-primary">
                    {item.muzakki_name || '-'}
                </span>
            ),
            className: 'w-[25%]'
        },
        {
            header: 'Total Nominal',
            cell: (item) => (
                <span className="text-sm font-semibold text-gray-900 dark:text-text-primary">
                    {formatCurrency(item.total_amount)}
                </span>
            ),
            className: 'w-[25%]'
        },
        {
            header: 'Tanggal',
            cell: (item) => (
                <span className="text-sm text-gray-600 dark:text-text-secondary">
                    {formatDate(item.receipt_date)}
                </span>
            ),
            className: "w-[20%] whitespace-nowrap"
        },
        {
            header: 'Aksi',
            cell: (item) => (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-primary-blue/10 text-blue-600 dark:text-primary-blue"
                        onClick={() => router.push(`/donation-receipt/${item.id}/edit`)}
                        title="Edit"
                    >
                        <Edit size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-dark-border text-gray-600 dark:text-text-secondary"
                        onClick={() => router.push(`/donation-receipt/${item.id}`)}
                        title="Detail"
                    >
                        <Eye size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                        onClick={() => { handleOpenDeleteModal(item.id) }}
                        title="Hapus"
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ),
            headerClassName: 'text-right',
            className: "w-[10%] text-right"
        }
    ];

    return (
        <>
            <div className="bg-white dark:bg-dark-paper rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[1000px]">
                        {/* Action Bar */}
                        <div className="p-6 space-y-4">
                            {/* Top Row: Search, DateRange and Add Button */}
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-3 items-center">
                                    <div className="w-72">
                                        <Input
                                            placeholder="Cari No. Kwitansi / Muzakki..."
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
                                    onClick={() => router.push('/donation-receipt/create')}
                                    className="w-auto"
                                    size="md"
                                >
                                    <Plus size={18} />
                                    Buat Penerimaan
                                </Button>
                            </div>

                            {/* Bottom Row: Filters */}
                            <div className="flex flex-row gap-3 w-auto items-center">
                                <div className="w-48">
                                    <Select
                                        value={fundTypeFilter}
                                        onChange={(e) => setFundTypeFilter(e.target.value)}
                                        options={fundTypeOptions}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-54">
                                    <Select
                                        value={paymentMethodFilter}
                                        onChange={(e) => setPaymentMethodFilter(e.target.value)}
                                        options={paymentMethodOptions}
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
                            emptyMessage="Tidak ada data penerimaan"
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
                title="Hapus Penerimaan Donasi"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <AlertTriangle className="h-6 w-6 shrink-0" />
                        <p className="text-sm">
                            Apakah Anda yakin ingin menghapus data penerimaan donasi ini? Data yang dihapus tidak dapat dikembalikan.
                        </p>
                    </div>

                    {isDeleting && (
                        <div className="flex items-center gap-3 text-blue-500 dark:text-blue-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm">Sedang menghapus...</p>
                        </div>
                    )}

                    {!isDeleting && deleteError && (
                        <div className="flex items-center gap-3 text-red-500 dark:text-red-400 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <AlertTriangle className="h-6 w-6 shrink-0" />
                            <p className="text-sm">{deleteError}</p>
                        </div>
                    )}

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

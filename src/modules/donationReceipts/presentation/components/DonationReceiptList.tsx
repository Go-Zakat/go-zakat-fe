'use client';

import {
    Eye,
    Edit2,
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
import { DateRangePicker } from '@/src/shared/ui/components/DateRangePicker';
import { useDonationReceiptListController } from '../hooks/useDonationReceiptListController';
import { FUND_TYPES, PAYMENT_METHODS } from '@/src/shared/config/constants';

// Helper untuk format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

// Formatting helper untuk format currency
const formatRupiah = formatCurrency;

// Helper untuk format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const formatPaymentMethod = (method: string) => {
    switch (method) {
        case PAYMENT_METHODS.CASH: return 'Tunai';
        case PAYMENT_METHODS.BANK_TRANSFER: return 'Transfer Bank';
        case PAYMENT_METHODS.E_WALLET: return 'E-Wallet';
        case PAYMENT_METHODS.QRIS: return 'QRIS';
        default: return method;
    }
};

export const DonationReceiptList = () => {
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

    const data = items;

    const fundTypeOptions = [
        { value: '', label: 'Semua Jenis Dana' },
        { value: FUND_TYPES.ZAKAT, label: 'Zakat' },
        { value: FUND_TYPES.INFAQ, label: 'Infaq' },
        { value: FUND_TYPES.SADAQAH, label: 'Sadaqah' },
    ];

    const paymentMethodOptions = [
        { value: '', label: 'Semua Metode Pembayaran' },
        { value: PAYMENT_METHODS.CASH, label: 'Tunai' },
        { value: PAYMENT_METHODS.BANK_TRANSFER, label: 'Transfer Bank' },
        { value: PAYMENT_METHODS.E_WALLET, label: 'E-Wallet' },
        { value: PAYMENT_METHODS.QRIS, label: 'QRIS' },
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
                                    onClick={() => router.push('/donation-receipts/create')}
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
                                <div className="w-48">
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
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-dark-main/50 border-y border-gray-100 dark:border-dark-border">
                                    <th className="px-6 py-4 w-12 text-center">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-primary-blue focus:ring-primary-blue cursor-pointer bg-transparent" />
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider min-w-[200px] whitespace-nowrap">No. Kwitansi</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider min-w-[200px]">Muzakki</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider w-[200px] whitespace-nowrap">Total Nominal</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider w-[200px] whitespace-nowrap">Tanggal</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-text-secondary uppercase tracking-wider w-[120px] whitespace-nowrap">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-dark-border bg-white dark:bg-dark-paper">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-text-secondary">
                                            Memuat data...
                                        </td>
                                    </tr>
                                ) : data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-text-secondary">
                                            Tidak ada data penerimaan
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-main/50">
                                            <td className="px-6 py-4 text-center">
                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-dark-border text-primary-blue focus:ring-primary-blue cursor-pointer bg-transparent" />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-text-primary">
                                                {item.receipt_number}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-text-primary">
                                                {item.muzakki_name || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-text-primary flex flex-col gap-1">
                                                {formatRupiah(item.total_amount)}
                                                <span className="w-fit px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                                                    {formatPaymentMethod(item.payment_method)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-text-secondary">
                                                {formatDate(item.receipt_date)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-primary-blue/10 text-blue-600 dark:text-primary-blue"
                                                        onClick={() => router.push(`/donation-receipts/${item.id}/edit`)}
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-dark-border text-gray-600 dark:text-text-secondary"
                                                        onClick={() => router.push(`/donation-receipts/${item.id}`)}
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

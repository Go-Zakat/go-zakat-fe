'use client';

import { useEffect, useState } from 'react';
import { useDonationReceiptList } from '../../application/useDonationReceiptList';
import { useDonationReceiptDelete } from '../../application/useDonationReceiptDelete';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useDonationReceiptListController = () => {
    // Hook untuk mengambil data list donation
    const { getDonationReceiptList, items, meta, isLoading } = useDonationReceiptList();
    // Hook untuk menghapus donation
    const { deleteDonationReceipt, isLoading: isDeleting } = useDonationReceiptDelete();

    // State untuk menyimpan keyword pencarian
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    // State untuk filter
    const [fundTypeFilter, setFundTypeFilter] = useState('');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // State untuk pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // State untuk modal konfirmasi hapus
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Effect untuk memanggil API saat search/pagination/filters berubah
    useEffect(() => {
        getDonationReceiptList({
            q: debouncedSearch,
            page,
            per_page: perPage,
            fund_type: fundTypeFilter || undefined,
            payment_method: paymentMethodFilter || undefined,
            date_from: startDate || undefined,
            date_to: endDate || undefined,
        });
    }, [debouncedSearch, page, perPage, fundTypeFilter, paymentMethodFilter, startDate, endDate]);

    // Fungsi untuk mengubah halaman
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (meta?.total_page || 1)) {
            setPage(newPage);
        }
    };

    // Fungsi untuk mengubah jumlah baris per halaman
    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(Number(e.target.value));
        setPage(1);
    };

    // Fungsi untuk membuka modal konfirmasi hapus
    const handleOpenDeleteModal = (id: string) => {
        setSelectedId(id);
        setIsDeleteModalOpen(true);
    };

    // Fungsi untuk menutup modal konfirmasi hapus
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedId(null);
    };

    // Fungsi untuk melakukan penghapusan data
    const handleConfirmDelete = async () => {
        if (!selectedId) return;

        const success = await deleteDonationReceipt(selectedId);
        if (success) {
            handleCloseDeleteModal();
            // Refresh data setelah berhasil menghapus
            getDonationReceiptList({
                q: debouncedSearch,
                page,
                per_page: perPage,
                fund_type: fundTypeFilter || undefined,
                payment_method: paymentMethodFilter || undefined,
            });
        }
    };

    return {
        // Data State
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

        // Setters / Handlers
        setSearch,
        setFundTypeFilter,
        setPaymentMethodFilter,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete
    };
};

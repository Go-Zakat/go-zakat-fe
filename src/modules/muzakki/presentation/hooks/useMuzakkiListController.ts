'use client';

import { useEffect, useState } from 'react';
import { useMuzakkiList } from '../../application/useMuzakkiList';
import { useMuzakkiDelete } from '../../application/useMuzakkiDelete';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useMuzakkiListController = () => {
    // Hook untuk mengambil data list muzakki
    const { getMuzakkiList, items, meta, isLoading } = useMuzakkiList();
    // Hook untuk menghapus muzakki
    const { deleteMuzakki, isLoading: isDeleting } = useMuzakkiDelete();

    // State untuk menyimpan keyword pencarian
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    // State untuk pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // State untuk modal konfirmasi hapus
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMuzakkiId, setSelectedMuzakkiId] = useState<string | null>(null);

    // Effect untuk memanggil API saat search/pagination berubah
    useEffect(() => {
        // Gunakan void dan masukkan getMuzakkiList ke dependency
        void getMuzakkiList({
            q: debouncedSearch,
            page,
            per_page: perPage
        });
    }, [debouncedSearch, page, perPage, getMuzakkiList]);

    // Fungsi untuk mengubah halaman
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (meta?.total_page || 1)) {
            setPage(newPage);
        }
    };

    // Ubah parameter jadi number (Clean Code)
    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1);
    };

    // Fungsi untuk membuka modal konfirmasi hapus
    const handleOpenDeleteModal = (id: string) => {
        setSelectedMuzakkiId(id);
        setIsDeleteModalOpen(true);
    };

    // Fungsi untuk menutup modal konfirmasi hapus
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedMuzakkiId(null);
    };

    // Fungsi untuk melakukan penghapusan data
    const handleConfirmDelete = async () => {
        if (!selectedMuzakkiId) return;

        const success = await deleteMuzakki(selectedMuzakkiId);
        if (success) {
            handleCloseDeleteModal();
            // Refresh data setelah berhasil menghapus
            void getMuzakkiList({
                q: debouncedSearch,
                page,
                per_page: perPage
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

        // Setters / Handlers
        setSearch,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete
    };
};
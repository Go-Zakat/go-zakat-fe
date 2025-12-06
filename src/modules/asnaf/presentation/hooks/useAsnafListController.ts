'use client';

import { useEffect, useState } from 'react';
import { useAsnafList } from '../../application/useAsnafList';
import { useAsnafDelete } from '../../application/useAsnafDelete';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useAsnafListController = () => {
    // Hook untuk mengambil data list asnaf
    const { getAsnafList, items, meta, isLoading } = useAsnafList();
    // Hook untuk menghapus asnaf
    const { deleteAsnaf, isLoading: isDeleting } = useAsnafDelete();

    // State untuk menyimpan keyword pencarian
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    // State untuk pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // State untuk modal konfirmasi hapus
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAsnafId, setSelectedAsnafId] = useState<string | null>(null);

    // Effect untuk memanggil API saat search/pagination berubah
    useEffect(() => {
        getAsnafList({
            q: debouncedSearch,
            page,
            per_page: perPage
        });
    }, [debouncedSearch, page, perPage]);

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
        setSelectedAsnafId(id);
        setIsDeleteModalOpen(true);
    };

    // Fungsi untuk menutup modal konfirmasi hapus
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedAsnafId(null);
    };

    // Fungsi untuk melakukan penghapusan data
    const handleConfirmDelete = async () => {
        if (!selectedAsnafId) return;

        const success = await deleteAsnaf(selectedAsnafId);
        if (success) {
            handleCloseDeleteModal();
            // Refresh data setelah berhasil menghapus
            getAsnafList({
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

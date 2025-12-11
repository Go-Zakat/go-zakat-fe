'use client';

import { useEffect, useState } from 'react';
import { useMustahiqList } from '../../application/useMustahiqList';
import { useMustahiqDelete } from '../../application/useMustahiqDelete';
import { useAsnafList } from '@/src/modules/asnaf/application/useAsnafList';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useMustahiqListController = () => {
    // Hook untuk mengambil data list mustahiq
    const { getMustahiqList, items, meta, isLoading } = useMustahiqList();
    // Hook untuk menghapus mustahiq
    const { deleteMustahiq, isLoading: isDeleting, error: deleteError, resetError } = useMustahiqDelete();

    // Hook untuk mengambil data list asnaf (untuk filter)
    const { getAsnafList, items: asnafList } = useAsnafList();

    // State untuk menyimpan keyword pencarian
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    // State untuk filter
    const [statusFilter, setStatusFilter] = useState('');
    const [asnafFilter, setAsnafFilter] = useState('');

    // State untuk pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // State untuk modal konfirmasi hapus
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMustahiqId, setSelectedMustahiqId] = useState<string | null>(null);

    // Fetch Asnaf List on mount
    useEffect(() => {
        void getAsnafList({ per_page: 100 });
    }, [getAsnafList]);

    // Effect untuk memanggil API saat search/pagination/filters berubah
    useEffect(() => {
        void getMustahiqList({
            q: debouncedSearch,
            page,
            per_page: perPage,
            status: statusFilter || undefined,
            asnafID: asnafFilter || undefined
        });
    }, [debouncedSearch, page, perPage, statusFilter, asnafFilter, getMustahiqList]);

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
        resetError();
        setSelectedMustahiqId(id);
        setIsDeleteModalOpen(true);
    };

    // Fungsi untuk menutup modal konfirmasi hapus
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedMustahiqId(null);
        resetError();
    };

    // Fungsi untuk melakukan penghapusan data
    const handleConfirmDelete = async () => {
        if (!selectedMustahiqId) return;

        const success = await deleteMustahiq(selectedMustahiqId);
        if (success) {
            handleCloseDeleteModal();
            // Refresh data setelah berhasil menghapus
            void getMustahiqList({
                q: debouncedSearch,
                page,
                per_page: perPage,
                status: statusFilter || undefined,
                asnafID: asnafFilter || undefined
            });
        }
    };

    return {
        // Data State
        items,
        meta,
        isLoading,
        isDeleting,
        deleteError,
        search,
        page,
        perPage,
        isDeleteModalOpen,
        statusFilter,
        asnafFilter,
        asnafList,

        // Setters / Handlers
        setSearch,
        setStatusFilter,
        setAsnafFilter,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete
    };
};
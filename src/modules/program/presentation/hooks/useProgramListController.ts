'use client';

import { useEffect, useState } from 'react';
import { useProgramList } from '../../application/useProgramList';
import { useProgramDelete } from '../../application/useProgramDelete';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useProgramListController = () => {
    // Hook untuk mengambil data list program
    const { getProgramList, items, meta, isLoading } = useProgramList();
    // Hook untuk menghapus program
    const { deleteProgram, isLoading: isDeleting } = useProgramDelete();

    // State untuk keyword pencarian
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    // State untuk filter
    const [typeFilter, setTypeFilter] = useState('');
    const [activeFilter, setActiveFilter] = useState(''); // 'true', 'false', or ''
    const [availableTypes, setAvailableTypes] = useState<string[]>([]);

    // State untuk pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // State untuk modal konfirmasi hapus
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

    // Persist types from items when no type filter is active
    useEffect(() => {
        if (!typeFilter && items.length > 0) {
            const types = Array.from(new Set(items.map(item => item.type)));
            // Merge with existing types
            setAvailableTypes(prev => Array.from(new Set([...prev, ...types])));
        }
    }, [items, typeFilter]);

    // Effect untuk memanggil API saat search/pagination/filter berubah
    useEffect(() => {
        getProgramList({
            q: debouncedSearch,
            page,
            per_page: perPage,
            type: typeFilter || undefined,
            active: activeFilter === 'true' ? true : activeFilter === 'false' ? false : undefined
        });
    }, [debouncedSearch, page, perPage, typeFilter, activeFilter]);

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
        setSelectedProgramId(id);
        setIsDeleteModalOpen(true);
    };

    // Fungsi untuk menutup modal konfirmasi hapus
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedProgramId(null);
    };

    // Fungsi untuk melakukan penghapusan data
    const handleConfirmDelete = async () => {
        if (!selectedProgramId) return;

        const success = await deleteProgram(selectedProgramId);
        if (success) {
            handleCloseDeleteModal();
            // Refresh data setelah berhasil menghapus
            getProgramList({
                q: debouncedSearch,
                page,
                per_page: perPage,
                type: typeFilter || undefined,
                active: activeFilter === 'true' ? true : activeFilter === 'false' ? false : undefined
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
        typeFilter,
        activeFilter,
        availableTypes,
        page,
        perPage,
        isDeleteModalOpen,

        // Setters / Handlers
        setSearch,
        setTypeFilter,
        setActiveFilter,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete
    };
};

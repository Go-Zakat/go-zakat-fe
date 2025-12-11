'use client';

import { useEffect, useState } from 'react';
import { useAsnafList } from '../../application/useAsnafList';
import { useAsnafDelete } from '../../application/useAsnafDelete';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useAsnafListController = () => {
    const { getAsnafList, items, meta, isLoading } = useAsnafList();
    const { deleteAsnaf, isLoading: isDeleting, error: deleteError, resetError } = useAsnafDelete();

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAsnafId, setSelectedAsnafId] = useState<string | null>(null);

    useEffect(() => {
        void getAsnafList({
            q: debouncedSearch,
            page,
            per_page: perPage
        });
    }, [debouncedSearch, page, perPage, getAsnafList]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (meta?.total_page || 1)) {
            setPage(newPage);
        }
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1);
    };

    const handleOpenDeleteModal = (id: string) => {
        resetError();
        setSelectedAsnafId(id);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedAsnafId(null);
        resetError();
    };

    const handleConfirmDelete = async () => {
        if (!selectedAsnafId) return;

        const success = await deleteAsnaf(selectedAsnafId);
        if (success) {
            handleCloseDeleteModal();
            void getAsnafList({
                q: debouncedSearch,
                page,
                per_page: perPage
            });
        }
    };

    return {
        items,
        meta,
        isLoading,
        isDeleting,
        deleteError,
        search,
        page,
        perPage,
        isDeleteModalOpen,
        setSearch,
        handlePageChange,
        handlePerPageChange,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete
    };
};
'use client';

import { useEffect, useState } from 'react';
import { useDistributionList } from '../../application/useDistributionList';
import { useDistributionDelete } from '../../application/useDistributionDelete';
import { useProgramList } from '@/src/modules/program/application/useProgramList'; // Restore this
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useDistributionListController = () => {
    // Hooks Application Layer
    const { getDistributionList, items, meta, isLoading } = useDistributionList();
    const { deleteDistribution, isLoading: isDeleting, error: deleteError, resetError } = useDistributionDelete();

    // Restore: Fetch Program List untuk Filter Dropdown
    const { getProgramList, items: programList } = useProgramList();

    // Local State
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    // Filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sourceFundFilter, setSourceFundFilter] = useState(''); // Maps to source_fund_type
    const [programFilter, setProgramFilter] = useState('');       // Maps to program_id

    // Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Fetch Program untuk Filter
    useEffect(() => {
        void getProgramList({ per_page: 100, active: true });
    }, [getProgramList]);

    // Fetch Data Distribution saat params berubah
    useEffect(() => {
        void getDistributionList({
            q: debouncedSearch,
            page,
            per_page: perPage,
            date_from: startDate || undefined,
            date_to: endDate || undefined,
            source_fund_type: sourceFundFilter || undefined,
            program_id: programFilter || undefined,
        });
    }, [
        debouncedSearch,
        page,
        perPage,
        startDate,
        endDate,
        sourceFundFilter,
        programFilter,
        getDistributionList
    ]);

    // Handlers
    const handlePageChange = (newPage: number) => setPage(newPage);
    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1);
    };

    const handleOpenDeleteModal = (id: string) => {
        resetError();
        setSelectedId(id);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedId(null);
        resetError();
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        const success = await deleteDistribution(selectedId);
        if (success) {
            handleCloseDeleteModal();
            // Refresh data
            void getDistributionList({
                q: debouncedSearch,
                page,
                per_page: perPage,
                date_from: startDate || undefined,
                date_to: endDate || undefined,
                source_fund_type: sourceFundFilter || undefined,
                program_id: programFilter || undefined,
            });
        }
    };

    return {
        items,
        meta,
        isLoading,
        isDeleting,
        deleteError,
        programList, // Restore: Untuk dropdown filter program

        // Filter States
        search, setSearch,
        page, handlePageChange,
        perPage, handlePerPageChange,
        startDate, setStartDate,
        endDate, setEndDate,
        sourceFundFilter, setSourceFundFilter,
        programFilter, setProgramFilter,

        // Delete Modal
        isDeleteModalOpen,
        handleOpenDeleteModal,
        handleCloseDeleteModal,
        handleConfirmDelete
    };
};
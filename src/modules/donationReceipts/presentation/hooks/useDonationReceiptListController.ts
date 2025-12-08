'use client';

import { useEffect, useState} from 'react';
import { useDonationReceiptList } from '../../application/useDonationReceiptList';
import { useDonationReceiptDelete } from '../../application/useDonationReceiptDelete';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useDonationReceiptListController = () => {
    const { getDonationReceiptList, items, meta, isLoading } = useDonationReceiptList();
    const { deleteDonationReceipt, isLoading: isDeleting } = useDonationReceiptDelete();

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [fundTypeFilter, setFundTypeFilter] = useState('');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        void getDonationReceiptList({
            q: debouncedSearch,
            page,
            per_page: perPage,
            fund_type: fundTypeFilter || undefined,
            payment_method: paymentMethodFilter || undefined,
            date_from: startDate || undefined,
            date_to: endDate || undefined,
        });
    }, [
        debouncedSearch,
        page,
        perPage,
        fundTypeFilter,
        paymentMethodFilter,
        startDate,
        endDate,
        getDonationReceiptList
    ]);

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
        setSelectedId(id);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedId(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;

        const success = await deleteDonationReceipt(selectedId);
        if (success) {
            handleCloseDeleteModal();
            void getDonationReceiptList({
                q: debouncedSearch,
                page,
                per_page: perPage,
                fund_type: fundTypeFilter || undefined,
                payment_method: paymentMethodFilter || undefined,
            });
        }
    };

    return {
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
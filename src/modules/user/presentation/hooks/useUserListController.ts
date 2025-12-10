'use client';

import { useEffect, useState } from 'react';
import { useUserList } from '../../application/useUserList';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useUserListController = () => {
    const { getUserList, items, meta, isLoading } = useUserList();

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        void getUserList({
            q: debouncedSearch,
            page,
            per_page: perPage
        });
    }, [debouncedSearch, page, perPage, getUserList]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (meta?.total_page || 1)) {
            setPage(newPage);
        }
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1);
    };

    return {
        items,
        meta,
        isLoading,
        search,
        page,
        perPage,
        setSearch,
        handlePageChange,
        handlePerPageChange,
    };
};

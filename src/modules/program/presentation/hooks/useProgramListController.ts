'use client';

import { useEffect, useState, useRef } from 'react'; // Tambahkan useRef
import { useProgramList } from '../../application/useProgramList';
import { useProgramDelete } from '../../application/useProgramDelete';
import { useDebounce } from '@/src/shared/hooks/useDebounce';

export const useProgramListController = () => {
    const { getProgramList, items, meta, isLoading } = useProgramList();
    const { deleteProgram, isLoading: isDeleting } = useProgramDelete();

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const [typeFilter, setTypeFilter] = useState('');
    const [activeFilter, setActiveFilter] = useState('');

    // Gunakan useRef untuk melacak tipe yang unik tanpa memicu render
    const accumulatedTypesRef = useRef<Set<string>>(new Set());
    const [availableTypes, setAvailableTypes] = useState<string[]>([]);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

    // Logic Persist Types Menggunakan Ref
    useEffect(() => {
        // Hanya jalankan jika ada items
        if (items.length > 0) {
            let hasNewType = false;

            items.forEach(item => {
                // Cek ke Ref (bukan State)
                if (item.type && !accumulatedTypesRef.current.has(item.type)) {
                    accumulatedTypesRef.current.add(item.type);
                    hasNewType = true;
                }
            });

            // Hanya update State (memicu render) jika benar-benar ada tipe baru
            if (hasNewType) {
                setAvailableTypes(Array.from(accumulatedTypesRef.current));
            }
        }
    }, [items]);

    // Fetch Data
    useEffect(() => {
        void getProgramList({
            q: debouncedSearch,
            page,
            per_page: perPage,
            type: typeFilter || undefined,
            active: activeFilter === 'true' ? true : activeFilter === 'false' ? false : undefined
        });
    }, [debouncedSearch, page, perPage, typeFilter, activeFilter, getProgramList]);

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
        setSelectedProgramId(id);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedProgramId(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedProgramId) return;

        const success = await deleteProgram(selectedProgramId);
        if (success) {
            handleCloseDeleteModal();
            void getProgramList({
                q: debouncedSearch,
                page,
                per_page: perPage,
                type: typeFilter || undefined,
                active: activeFilter === 'true' ? true : activeFilter === 'false' ? false : undefined
            });
        }
    };

    return {
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
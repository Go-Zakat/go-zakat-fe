'use client';

import {
    Edit,
    Search,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/shared/ui/components/Button';
import { Input } from '@/src/shared/ui/components/Input';
import { useUserListController } from '@/src/modules/user/presentation/hooks/useUserListController';
import { Pagination } from "@/src/shared/ui/components/Pagination";
import { Column, Table } from "@/src/shared/ui/components/Table";
import { User } from '@/src/shared/types/common.types';

export const UserList = () => {
    const router = useRouter();

    const {
        items,
        meta,
        isLoading,
        search,
        page,
        perPage,
        setSearch,
        handlePageChange,
        handlePerPageChange,
    } = useUserListController();

    const roleLabels: Record<string, string> = {
        admin: 'Administrator',
        staff: 'Staf',
        viewer: 'Peninjau'
    };

    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
            case 'staf':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'viewer':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const columns: Column<User>[] = [
        {
            header: 'Nama',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-primary-blue/20 text-blue-600 dark:text-primary-blue flex items-center justify-center text-xs font-bold">
                        {item.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-text-primary">
                            {item.name}
                        </span>
                            <span className="text-xs text-gray-500 dark:text-text-secondary">
                            {item.email}
                        </span>
                    </div>
                </div>

            ),
            className: "w-[40%]"
        },
        {
            header: 'Role',
            cell: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleColor(item.role)}`}>
                    {roleLabels[item.role] || item.role}
                </span>
            ),
            className: "w-[20%]"
        },
        {
            header: 'Tanggal Dibuat',
            cell: (item) => (
                <span className="text-sm text-gray-500 dark:text-text-secondary">
                    {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </span>
            ),
            className: "w-[25%] whitespace-nowrap"
        },
        {
            header: 'Aksi',
            cell: (item) => (
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 dark:hover:bg-primary-blue/10 text-blue-600 dark:text-primary-blue" title="Edit Role" onClick={() => router.push(`/user/${item.id}/edit`)}>
                        <Edit size={16} />
                    </Button>
                </div>
            ),
            headerClassName: 'text-right',
            className: "w-[15%] whitespace-nowrap"
        }
    ];

    return (
        <div className="bg-white dark:bg-dark-paper rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
            <div className="overflow-x-auto">
                <div className="min-w-[1000px]">
                    {/* Action Bar */}
                    <div className="p-6 flex flex-row gap-4 justify-between items-center">
                        <div className="flex flex-row gap-3 w-auto">
                            <div className="w-64">
                                <Input
                                    placeholder="Cari User..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    startIcon={<Search size={18} />}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <Table
                        columns={columns}
                        data={items}
                        isLoading={isLoading}
                        keyExtractor={(item) => item.id}
                        emptyMessage="Belum ada data user"
                    />

                    {/* Pagination */}
                    <Pagination
                        page={page}
                        perPage={perPage}
                        totalItems={meta?.total || 0}
                        totalPages={meta?.total_page || 1}
                        isLoading={isLoading}
                        onPageChange={handlePageChange}
                        onPerPageChange={handlePerPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

'use client';

import Link from 'next/link';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Button } from '@/src/shared/ui/components/Button';
import { Input } from '@/src/shared/ui/components/Input';
import { Card } from '@/src/shared/ui/components/Card';
import { Select } from '@/src/shared/ui/components/Select';
import { UpdateRoleFormValues } from '../../domain/user.types';

interface UserFormProps {
    register: UseFormRegister<UpdateRoleFormValues>;
    errors: FieldErrors<UpdateRoleFormValues>;
    onSubmit: () => void;
    isLoading: boolean;
    error: string | null;
    userName?: string;
    userEmail?: string;
    roleValue?: string;
}

export const UserForm = ({
    register,
    errors,
    onSubmit,
    isLoading,
    error,
    userName,
    userEmail,
    roleValue
}: UserFormProps) => {
    return (
        <Card className="p-6">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="border-b border-gray-100 dark:border-dark-border pb-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                        Edit Role User
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Perbarui role untuk user <strong>{userName || '...'}</strong>
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Nama User"
                            value={userName || ''}
                            readOnly
                            disabled
                        />
                        <Input
                            label="Email"
                            value={userEmail || ''}
                            readOnly
                            disabled
                        />
                    </div>
                    <Select
                        label="Role"
                        registration={register('role')}
                        error={errors.role}
                        value={roleValue}
                        options={[
                            { value: 'admin', label: 'Administrator' },
                            { value: 'staf', label: 'Staf' },
                            { value: 'viewer', label: 'Peninjau' },
                        ]}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-dark-border mt-6">
                    <Link href="/user">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        Simpan Perubahan
                    </Button>
                </div>
            </form>
        </Card>
    );
};

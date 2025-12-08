'use client';

import Link from 'next/link';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { Textarea } from '@/src/shared/ui/components/Textarea';
import { MuzakkiFormValues } from '../../domain/muzakki.types';

interface MuzakkiFormProps {
    register: UseFormRegister<MuzakkiFormValues>;
    errors: FieldErrors<MuzakkiFormValues>;
    onSubmit: () => void;
    isLoading: boolean;
    error: string | null;
    isEditMode?: boolean;
}

export const MuzakkiForm = ({
    register,
    errors,
    onSubmit,
    isLoading,
    error,
    isEditMode = false
}: MuzakkiFormProps) => {
    return (
        <Card className="p-6">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="border-b border-gray-100 dark:border-dark-border pb-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                        {isEditMode ? 'Edit Data Muzakki' : 'Tambah Muzakki Baru'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEditMode
                            ? 'Perbarui informasi detail mengenai muzakki ini.'
                            : 'Lengkapi formulir di bawah untuk menambahkan muzakki baru.'}
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Nama Muzakki"
                            placeholder="Masukkan nama muzakki"
                            error={errors.name}
                            registration={register('name')}
                        />

                        <Input
                            label="Nomor Telepon"
                            placeholder="Contoh: 08123456789"
                            error={errors.phoneNumber}
                            registration={register('phoneNumber')}
                        />
                    </div>

                    <Textarea
                        label="Alamat"
                        placeholder="Masukkan alamat lengkap muzakki"
                        registration={register('address')}
                        error={errors.address}
                        rows={3}
                    />

                    <Textarea
                        label="Catatan"
                        placeholder="Masukkan catatan tambahan (opsional)"
                        registration={register('notes')}
                        error={errors.notes}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-dark-border mt-6">
                    <Link href="/muzakki">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        {isEditMode ? 'Simpan Perubahan' : 'Simpan Muzakki'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};
'use client';

import Link from 'next/link';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import { Textarea } from '@/src/shared/ui/components/Textarea';
import { AsnafFormValues } from '../../domain/asnaf.types';

interface AsnafFormProps {
    register: UseFormRegister<AsnafFormValues>;
    errors: FieldErrors<AsnafFormValues>;
    onSubmit: () => void;

    isLoading: boolean;
    error: string | null;
    isEditMode?: boolean;
}

export const AsnafForm = ({
    register,
    errors,
    onSubmit,
    isLoading,
    error,
    isEditMode = false
}: AsnafFormProps) => {
    return (
        <Card className="p-6">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="border-b border-gray-100 dark:border-dark-border pb-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-text-primary">
                        {isEditMode ? 'Edit Data Asnaf' : 'Tambah Asnaf Baru'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEditMode
                            ? 'Perbarui informasi detail mengenai asnaf ini.'
                            : 'Lengkapi formulir di bawah untuk menambahkan kategori asnaf baru.'}
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Nama Asnaf"
                        placeholder="Contoh: Fakir, Miskin, Amil"
                        error={errors.name}
                        registration={register('name')}
                    />

                    <Textarea
                        label="Deskripsi"
                        placeholder="Jelaskan kriteria atau detail mengenai asnaf ini (opsional)..."
                        registration={register('description')}
                        error={errors.description}
                        rows={4}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-dark-border mt-6">
                    <Link href="/asnaf">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        {isEditMode ? 'Simpan Perubahan' : 'Simpan Asnaf'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};
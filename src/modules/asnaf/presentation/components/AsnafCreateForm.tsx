'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { asnafSchema, AsnafFormValues } from '../../domain/asnaf.types';
import { useAsnafCreate } from '../../application/useAsnafCreate';
import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import Link from 'next/link';

export const AsnafCreateForm = () => {
    const { createAsnaf, isLoading, error } = useAsnafCreate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AsnafFormValues>({
        resolver: zodResolver(asnafSchema),
    });

    const onSubmit = (data: AsnafFormValues) => {
        createAsnaf(data);
    };

    return (
        <Card className="max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        label="Nama Asnaf"
                        placeholder="Masukkan nama asnaf"
                        error={errors.name}
                        registration={register('name')}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>
                        <textarea
                            className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Masukkan deskripsi asnaf (opsional)"
                            {...register('description')}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4">
                    <Link href="/asnaf">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        Simpan Asnaf
                    </Button>
                </div>
            </form>
        </Card>
    );
};

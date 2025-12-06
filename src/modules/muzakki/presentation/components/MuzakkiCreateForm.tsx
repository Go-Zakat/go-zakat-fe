'use client';

import {Input} from '@/src/shared/ui/components/Input';
import {Button} from '@/src/shared/ui/components/Button';
import {Card} from '@/src/shared/ui/components/Card';
import Link from 'next/link';
import {Textarea} from '@/src/shared/ui/components/Textarea';
import {useMuzakkiCreateController} from "@/src/modules/muzakki/presentation/hooks/useMuzakkiCreateController";

export const MuzakkiCreateForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit
    } = useMuzakkiCreateController();

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4">
                    <Link href="/muzakki">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        Simpan Muzakki
                    </Button>
                </div>
            </form>
        </Card>
    );
};

'use client';

import { Input } from '@/src/shared/ui/components/Input';
import { Button } from '@/src/shared/ui/components/Button';
import { Card } from '@/src/shared/ui/components/Card';
import Link from 'next/link';
import { Textarea } from '@/src/shared/ui/components/Textarea';
import { Select } from '@/src/shared/ui/components/Select';
import { useMustahiqCreateController } from "@/src/modules/mustahiq/presentation/hooks/useMustahiqCreateController";
import { MUSTAHIQ_STATUS } from '@/src/shared/config/constants';

export const MustahiqCreateForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isLoading,
        error,
        onSubmit,
        asnafList
    } = useMustahiqCreateController();

    const statusOptions = [
        { value: MUSTAHIQ_STATUS.ACTIVE, label: 'Aktif' },
        { value: MUSTAHIQ_STATUS.INACTIVE, label: 'Tidak Aktif' },
        { value: MUSTAHIQ_STATUS.PENDING, label: 'Pending' },
    ];

    const asnafOptions = [
        { value: '', label: 'Pilih Asnaf' },
        ...asnafList.map(asnaf => ({
            value: asnaf.id,
            label: asnaf.name
        }))
    ];

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        label="Nama Mustahiq"
                        placeholder="Masukkan nama mustahiq"
                        error={errors.name}
                        registration={register('name')}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Nomor Telepon"
                            placeholder="Contoh: 08123456789"
                            error={errors.phoneNumber}
                            registration={register('phoneNumber')}
                        />

                        <Select
                            label="Asnaf"
                            options={asnafOptions}
                            error={errors.asnafID}
                            registration={register('asnafID')}
                        />
                    </div>

                    <Select
                        label="Status"
                        options={statusOptions}
                        error={errors.status}
                        registration={register('status')}
                    />

                    <Textarea
                        label="Alamat"
                        placeholder="Masukkan alamat lengkap"
                        registration={register('address')}
                        error={errors.address}
                        rows={3}
                    />

                    <Textarea
                        label="Deskripsi"
                        placeholder="Masukkan deskripsi tambahan (opsional)"
                        registration={register('description')}
                        error={errors.description}
                        rows={3}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4">
                    <Link href="/mustahiq">
                        <Button variant="outline" type="button" disabled={isLoading}>
                            Batal
                        </Button>
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        Simpan Mustahiq
                    </Button>
                </div>
            </form>
        </Card>
    );
};

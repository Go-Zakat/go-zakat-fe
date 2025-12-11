import React from 'react';
import { Button } from '@/src/shared/ui/components/Button';
import { Tooltip } from '@/src/shared/ui/components/Tooltip';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
    icon: LucideIcon | React.ElementType; // Bisa menerima icon dari Lucide
    onClick: () => void;
    variant?: React.ComponentProps<typeof Button>['variant'];
    size?: React.ComponentProps<typeof Button>['size'];
    className?: string;
    disabled?: boolean;
    title?: string; // Judul tombol (misal untuk atribut title HTML)
    disabledTooltip?: string; // Pesan yang muncul di tooltip jika disabled
}

export const ActionButton = ({
    icon: Icon,
    onClick,
    variant = 'ghost',
    size = 'icon',
    className,
    disabled = false,
    title,
    disabledTooltip = "Anda tidak memiliki akses untuk fitur ini"
}: ActionButtonProps) => {

    // Jika tombol disabled (misal karena permission), bungkus dengan Tooltip
    if (disabled) {
        return (
            <Tooltip content={disabledTooltip}>
                {/* Div pembungkus diperlukan karena elemen disabled tidak bisa memicu event mouse di beberapa browser */}
                <div className="cursor-not-allowed opacity-50 inline-block">
                    <Button
                        variant={variant}
                        size={size}
                        className={className}
                        disabled={true}
                        title={title}
                        type="button"
                    >
                        <Icon size={16} />
                    </Button>
                </div>
            </Tooltip>
        );
    }

    // Jika normal, render tombol biasa
    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            onClick={onClick}
            title={title}
            type="button"
        >
            <Icon size={16} />
        </Button>
    );
};
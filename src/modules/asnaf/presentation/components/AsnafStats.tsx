import { Wallet, Users, FileText, Activity } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    color: 'yellow' | 'blue' | 'red' | 'green';
    progress?: number;
}

const StatCard = ({ title, value, icon: Icon, color, progress }: StatCardProps) => {
    const colorStyles = {
        yellow: {
            bg: 'bg-yellow-50',
            text: 'text-yellow-600',
            bar: 'bg-yellow-500',
        },
        blue: {
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            bar: 'bg-blue-500',
        },
        red: {
            bg: 'bg-red-50',
            text: 'text-red-600',
            bar: 'bg-red-500',
        },
        green: {
            bg: 'bg-emerald-50',
            text: 'text-emerald-600',
            bar: 'bg-emerald-500',
        },
    };

    const style = colorStyles[color];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
                    <p className="text-sm text-gray-500">{title}</p>
                </div>
                <div className={`p-3 rounded-lg ${style.bg} ${style.text}`}>
                    <Icon size={20} />
                </div>
            </div>
            {progress !== undefined && (
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                        className={`h-1.5 rounded-full ${style.bar}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export const AsnafStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Total Asnaf"
                value="8"
                icon={Users}
                color="yellow"
                progress={60}
            />
            <StatCard
                title="Program Aktif"
                value="12"
                icon={FileText}
                color="blue"
                progress={45}
            />
            <StatCard
                title="Total Penyaluran"
                value="Rp 450M"
                icon={Wallet}
                color="red"
                progress={30}
            />
            <StatCard
                title="Pertumbuhan"
                value="+24%"
                icon={Activity}
                color="green"
                progress={75}
            />
        </div>
    );
};

'use client';

import { useEffect } from 'react';
import { useFundBalance } from '../../application/useFundBalance';
import { FUND_TYPES } from '@/src/shared/config/constants';

export const useDashboardStatsController = () => {
    const { getFundBalance, data, isLoading } = useFundBalance();

    useEffect(() => {
        void getFundBalance();
    }, [getFundBalance]);

    // Helper logic untuk memparsing data array ke object saldo spesifik
    const getBalance = (type: string) => data.find(d => d.fund_type === type);

    const zakatBalance = getBalance(FUND_TYPES.ZAKAT) || getBalance('zakat_maal');
    const fitrahBalance = getBalance('zakat_fitrah');
    const infaqBalance = getBalance(FUND_TYPES.INFAQ);
    const sadaqahBalance = getBalance(FUND_TYPES.SADAQAH);

    return {
        isLoading,
        zakatBalance,
        fitrahBalance,
        infaqBalance,
        sadaqahBalance
    };
};
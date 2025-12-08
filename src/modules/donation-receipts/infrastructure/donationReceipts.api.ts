import { httpClient } from '@/src/shared/api/httpClient';
import { ENDPOINTS } from '@/src/shared/api/endpoints';
import {
    DonationReceiptListResponseWrapper,
    DonationReceiptResponseWrapper,
    DonationReceiptDeleteResponseWrapper,
    DonationReceiptRequest,
} from '../domain/donationReceipts.types';

/**
 * Query params untuk GET /api/v1/donation-receipts
 */
export interface GetDonationReceiptListParams {
    q?: string;
    page?: number;
    per_page?: number;
    date_from?: string;
    date_to?: string;
    fund_type?: string;
    zakat_type?: string;
    payment_method?: string;
    muzakki_id?: string;
}

/**
 * Donation Receipt API
 * Semua API calls untuk opearsional Penerimaan
 */
export const donationReceiptsApi = {
    getList: async (params?: GetDonationReceiptListParams): Promise<DonationReceiptListResponseWrapper> => {
        const response = await httpClient.get<DonationReceiptListResponseWrapper>(
            ENDPOINTS.DONATION_RECEIPTS.LIST,
            { params }
        );
        return response.data;
    },

    getById: async (id: string): Promise<DonationReceiptResponseWrapper> => {
        const response = await httpClient.get<DonationReceiptResponseWrapper>(
            ENDPOINTS.DONATION_RECEIPTS.DETAIL(id)
        );
        return response.data;
    },

    create: async (data: DonationReceiptRequest): Promise<DonationReceiptResponseWrapper> => {
        const response = await httpClient.post<DonationReceiptResponseWrapper>(
            ENDPOINTS.DONATION_RECEIPTS.CREATE,
            data
        );
        return response.data;
    },

    update: async (id: string, data: DonationReceiptRequest): Promise<DonationReceiptResponseWrapper> => {
        const response = await httpClient.put<DonationReceiptResponseWrapper>(
            ENDPOINTS.DONATION_RECEIPTS.UPDATE(id),
            data
        );
        return response.data;
    },

    delete: async (id: string): Promise<DonationReceiptDeleteResponseWrapper> => {
        const response = await httpClient.delete<DonationReceiptDeleteResponseWrapper>(
            ENDPOINTS.DONATION_RECEIPTS.DELETE(id)
        );
        return response.data;
    },
};

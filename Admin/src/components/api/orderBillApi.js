import axiosClient from './axiosClient';

class orderBillApi {
    createdOrder = async (params) => {
        const url = 'order-bill/client';
        return axiosClient.post(url, {params});
    };
    updateOrder = async (params) => {
        const url = 'order-bill';
        return axiosClient.post(url, {params});
    };
    getOrderById = async (id) => {
        const url = `admin/order-bill?id=${id}`;
        return axiosClient.get(url);
    };
}

export default new orderBillApi();

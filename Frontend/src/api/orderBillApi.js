import axiosClient from './axiosClient';

class orderBillApi {
    createdOrder = async (params) => {
        const url = 'order-bill/client';
        return axiosClient.post(url, {params});
    };
}

export default new orderBillApi();

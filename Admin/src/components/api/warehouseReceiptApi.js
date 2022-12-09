import axiosClient from './axiosClient';

class warehouseReceiptApi {
    createdWarehouse = async (params) => {
        const url = 'warehouse-receipt';
        return axiosClient.post(url, {params});
    } 
}

export default new warehouseReceiptApi();
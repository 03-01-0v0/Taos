import axiosClient from './axiosClient';

class warehouseExportApi {
    createdWarehouse = async (params) => {
        const url = 'warehouse-export';
        return axiosClient.post(url, {params});
    } 
}

export default new warehouseExportApi();
import axiosClient from './axiosClient';

class productApi {
    createdProduct = async (params) => {
        const url = 'product';
        return axiosClient.post(url, {params});
    } 
}

export default new productApi();
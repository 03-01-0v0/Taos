import axiosClient from './axiosClient';

class accountApi {
    createdAccount = async (params) => {
        const url = 'account';
        return axiosClient.post(url, {params});
    } 
}

export default new accountApi();
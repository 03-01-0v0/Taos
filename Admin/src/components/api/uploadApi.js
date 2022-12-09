import axiosClient from './axiosClient';

class uploadApi {
    upload = async (data) => {
        const url = 'upload';
        return axiosClient.post(url, data);
    }
    uploadMulti = async (data) => {
        const url = 'upload/multi';
        return axiosClient.post(url, data);
    }
}

export default new uploadApi();
import axiosClient from './axiosClient';

class userApi {
    createdUser = async (params) => {
        const url = 'users/admin';
        return axiosClient.post(url, {params});
    };
}

export default new userApi();

import axiosClient from './axiosClient';

class AuthApi {
    login = (credentials) => {
        const {username, password} = credentials;
        const url = 'sign-in';
        const params = {name: username, password};
        return axiosClient.post(url, params);
    }
}

const authApi = new AuthApi();
export default authApi;
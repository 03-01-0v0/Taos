import axios from 'axios';
import queryString from 'query-string';

const API_URL = 'http://localhost:3001/';

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here...
    const token = localStorage.getItem('token') || '';
    config.headers['Authorization'] = token;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (error) => {
        if (error.response?.data?.message?.indexOf('jwt expired') > -1) {
            localStorage.setItem('user', '');
        }
        return error.response;
    }
);
export default axiosClient;

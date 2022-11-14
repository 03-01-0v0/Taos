import axios from "axios";
import queryString from "query-string";
import { localStore } from '../store/localStore';

const axiosClient = axios.create({
    baseURL: 'http://api.taos.localhost',
    headers: {
        "content-type": "application/json",
    },
    // paramsSerializer: (params: any) => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here...
    const token: string = localStore.getAuthToken() || "";
    config.headers!["Authorization"] = token;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.data?.message?.indexOf("jwt expired") > -1) {
            localStore.setAuthToken("");            
        }
        return error.response;
    }
);
export default axiosClient;

import axiosClient from './axiosClient';
import User from '../interfaces/UserInterface';
import queryString from "query-string";

interface Infor {
    name: string,
    password: string
}

class SignInApi {
    signIn = (name: string, password: string): Promise<User> => {
        const url = '/sign-in';
        const params = queryString.stringify({name, password});
        return new Promise((resolve, reject) => {
            axiosClient.get(url, {
                params
            }).then(
                res => {                    
                    resolve(res.data as User);
                }
            ).catch(err => {
                reject(err);
            })
        });
    };
}
const signInApi = new SignInApi();
export default signInApi;

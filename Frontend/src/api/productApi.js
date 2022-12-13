import axiosClient from './axiosClient';

class productApi {
    getSliderProduct = async () => {
        const url = 'product/slider';
        return axiosClient.get(url);
    }

    getListProduct = async () => {
        const url = 'product';
        return axiosClient.get(url);
    }

    getListProductByName = async (name) => {
        const url = `product/product-type?name=${name}`;
        return axiosClient.get(url)
    }

    getProductById = async (id) => {
        const url = `product/${id}`;
        return axiosClient.get(url);
    }
}

export default new productApi();
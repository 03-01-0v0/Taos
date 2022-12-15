import React, {useEffect, useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';

import ProductView from './ProductView';

import Button from './Button';

import {remove} from '../redux/product-modal/productModalSlice';

import productData from '../assets/fake-data/products';

import productApi from '../api/productApi';
import {useQuery} from 'react-query';
import slugify from 'slugify';

const ProductViewModal = () => {
    const fetchListData = async () => {
        const res = await productApi.getListProduct();
        return res.data;
    };
    const listProductQuery = useQuery('lstCartProduct', fetchListData);
    const [lstProduct, setLstProduct] = useState([]);

    const productSlug = useSelector((state) => state.productModal.value);
    const dispatch = useDispatch();
    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        if (listProductQuery.data) {
            setLstProduct(listProductQuery.data);
        }
    }, [listProductQuery.data]);

    useEffect(() => {
        if (lstProduct) {
            let prod = lstProduct.find((e) => e.id === productSlug);
            setProduct(prod);
        }
    }, [productSlug, lstProduct]);
    return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
            <div className='product-view__modal__content'>
                <ProductView product={product} />
                <div className='product-view__modal__content__close'>
                    <Button size='sm' onClick={() => dispatch(remove())}>
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductViewModal;

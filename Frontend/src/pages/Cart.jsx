import React, {useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import Helmet from '../components/Helmet';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

import numberWithCommas from '../utils/numberWithCommas';
import slugify from 'slugify';
import {useQuery} from 'react-query';
import productApi from '../api/productApi';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const fetchListData = async () => {
        const res = await productApi.getListProduct();
        return res.data;
    };
    const listProductQuery = useQuery('lstCartProduct', fetchListData);
    useEffect(() => {
        if (listProductQuery.data) {
            setProducts(listProductQuery.data);
        } else setProducts([]);
    }, [listProductQuery.data]);
    const cartItems = useSelector((state) => state.cartItems.value);

    useEffect(() => {
        if (products) {
            if (cartItems && cartItems.length) {
                const res = cartItems.map((e) => {
                    let product = products.find((product) => {
                        if (
                            slugify(product.name.toLowerCase()) === e.slug &&
                            product.color === e.color &&
                            product.capacity.includes(e.capacity)
                        )
                            return true;
                        return false;
                    });
                    return {
                        ...e,
                        product: product,
                    };
                });
                setCartProducts(res);
            }
        }
    }, [products]);

    const [cartProducts, setCartProducts] = useState([]);

    const [totalProducts, setTotalProducts] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (products) {
            if (cartItems && cartItems.length) {
                const res = cartItems.map((e) => {
                    let product = products.find((product) => {
                        if (
                            slugify(product.name.toLowerCase()) === e.slug &&
                            product.color === e.color &&
                            product.capacity.includes(e.capacity)
                        )
                            return true;
                        return false;
                    });
                    return {
                        ...e,
                        product: product,
                    };
                });
                setCartProducts(res);
            } else setCartProducts([]);
        }
        setTotalPrice(
            cartItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0)
        );
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0));
    }, [cartItems]);

    return (
        <Helmet title='Giỏ hàng'>
            <div className='cart'>
                <div className='cart__info'>
                    <div className='cart__info__txt'>
                        <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
                        <div className='cart__info__txt__price'>
                            <span>Thành tiền:</span>{' '}
                            <span>{numberWithCommas(Number(totalPrice))}</span>
                        </div>
                    </div>
                    <div className='cart__info__btn'>
                        <Link to='/payment'>
                            <Button size='block'>Đặt hàng</Button>
                        </Link>
                        <Link to='/iphone'>
                            <Button size='block'>Tiếp tục mua hàng</Button>
                        </Link>
                    </div>
                </div>
                <div className='cart__list'>
                    {cartProducts.map((item, index) => (
                        <CartItem item={item} key={index} />
                    ))}
                </div>
            </div>
        </Helmet>
    );
};

export default Cart;

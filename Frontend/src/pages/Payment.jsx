import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import productApi from '../api/productApi';
import {useQuery} from 'react-query';
import slugify from 'slugify';
import orderBillApi from '../api/orderBillApi';
import {Form, Field, ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import {clearItem} from '../redux/shopping-cart/cartItemsSlide';
import {useDispatch} from 'react-redux';

const Payment = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [isRedirect, setIsRedirect] = useState(false);
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
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
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
    }, [products]);

    const handleSubmit = async (value) => {
        const prods = cartProducts.map((e) => {
            return {
                id: e.product.id,
                price: e.price,
                quantity: e.quantity,
                color: e.color,
                capacity: e.capacity + 'GB',
            };
        });
        const params = {
            ...value,
            products: prods,
        };
        console.log(params);
        const res = await orderBillApi.createdOrder(params);
        if (res.success) {
            Swal.fire(
                'Success',
                'Your order has been successfully placed. Thank U',
                'success'
            ).then((res) => {
                if (res.isConfirmed) {
                    dispatch(clearItem());
                    setIsRedirect(true);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops... Sorry',
                text: 'Something went wrong!',
            });
        }
    };

    if (isRedirect) return <Redirect to='/' />;

    return (
        <div className='payment__container'>
            <section className='checkout'>
                <h2 className='section-heading'>Thanh Toán</h2>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        phoneNumber: '',
                        address: '',
                        note: '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .min(6, 'must be 6 character or than')
                            .required('Required'),
                        email: Yup.string().email('Must be email').required('Required'),
                        phoneNumber: Yup.string()
                            .min(10, 'must be 10 character or than')
                            .required('Required'),
                        address: Yup.string()
                            .min(6, 'must be 6 character or than')
                            .required('Required'),
                    })}
                    onSubmit={(value) => handleSubmit(value)}
                >
                    <Form className='payment-form'>
                        <div className='payment-method'>
                            <button className='method selected'>
                                <div className='method__group'>
                                    <ion-icon name='card'></ion-icon>
                                    <span>Thanh toán khi nhận hàng</span>
                                </div>

                                <ion-icon
                                    className='checkmark fill'
                                    name='checkmark-circle'
                                ></ion-icon>
                            </button>

                            <button className='method'>
                                <div className='method__group'>
                                    <ion-icon name='logo-paypal'></ion-icon>

                                    <span>VN Pay</span>
                                </div>

                                <ion-icon
                                    className='checkmark'
                                    name='checkmark-circle-outline'
                                ></ion-icon>
                            </button>
                        </div>

                        <div className='cart__group__input'>
                            <div className='cardholder-name'>
                                <label htmlFor='cardholder-name' className='label-default'>
                                    Họ và tên
                                </label>
                                <Field type='text' name='name' className='input-default' />
                                <div className='error-message'>
                                    <ErrorMessage name='name' />
                                </div>
                            </div>

                            <div className='card-number'>
                                <label htmlFor='card-number' className='label-default'>
                                    Email
                                </label>
                                <Field type='email' name='email' className='input-default' />
                                <div className='error-message'>
                                    <ErrorMessage name='email' />
                                </div>
                            </div>
                            <div className='card-number'>
                                <label htmlFor='card-number' className='label-default'>
                                    Số điện thoại
                                </label>
                                <Field type='text' name='phoneNumber' className='input-default' />
                                <div className='error-message'>
                                    <ErrorMessage name='phoneNumber' />
                                </div>
                            </div>
                            <div className='card-number'>
                                <label htmlFor='card-number' className='label-default'>
                                    Địa chỉ
                                </label>
                                <Field type='text' name='address' className='input-default' />
                                <div className='error-message'>
                                    <ErrorMessage name='address' />
                                </div>
                            </div>
                            <div className='card-number'>
                                <label htmlFor='card-number' className='label-default'>
                                    Ghi chú
                                </label>
                                <Field type='text' name='note' className='input-default' />
                                <div className='error-message'>
                                    <ErrorMessage name='note' />
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            <span id='payAmount'>Đặt Hàng</span>
                        </button>
                    </Form>
                </Formik>
            </section>
            <div className='cart'>
                <div className='cart__info'>
                    <h2>Tóm tắt đơn hàng</h2>
                    <div className='cart__info__txt'>
                        {cartProducts.map((cartProduct) => {
                            if (cartProduct.product)
                                return (
                                    <div
                                        key={cartProduct.product.id}
                                        className='cart__info__txt__product'
                                    >
                                        <span>{`${cartProduct.quantity}x ${cartProduct.product.name} ${cartProduct.product.color} ${cartProduct.product.capacity}`}</span>{' '}
                                        <span>
                                            {(
                                                cartProduct.quantity * cartProduct.product.price
                                            ).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </div>
                                );
                        })}
                        <hr />
                        <div className='cart__info__txt__price'>
                            <span>Tổng đơn hàng:</span>{' '}
                            <span>
                                {totalPrice.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </div>
                        <div className='cart__info__txt__price'>
                            <span>Phí giao hàng:</span>{' '}
                            <span>
                                {Number(50000).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </div>
                        <div className='cart__info__txt__price'>
                            <span>Tổng thanh toán:</span>{' '}
                            <span>
                                {(totalPrice + 50000).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;

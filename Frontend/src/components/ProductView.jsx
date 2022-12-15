import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router';

import {useDispatch} from 'react-redux';

import {addItem} from '../redux/shopping-cart/cartItemsSlide';
import {remove} from '../redux/product-modal/productModalSlice';

import Button from './Button';
import numberWithCommas from '../utils/numberWithCommas';

import slugify from 'slugify';
import productApi from '../api/productApi';
import {useQuery} from 'react-query';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductView = (props) => {
    const dispatch = useDispatch();
    const fetchListData = async () => {
        const res = await productApi.getListProduct();
        return res.data;
    };
    const [products, setProducts] = useState([]);
    const listProductQuery = useQuery('lstCartProduct', fetchListData);
    useEffect(() => {
        if (listProductQuery.data) {
            setProducts(listProductQuery.data);
        } else setProducts([]);
    }, [listProductQuery.data]);
    let product = props.product;
    const colors = ['blue', 'gray', 'green', 'gold', 'pink'];
    const capacities = ['64', '128', '256', '512'];

    if (product === undefined)
        product = {
            id: '',
            code: '',
            capacity: '',
            color: '',
            description: '',
            shortDescription: '',
            img: ['1', '2'],
            isShell: '',
            name: '',
            price: '',
            purchasePrice: '',
            quantity: '',
            uniId: '',
        };
    const [previewImg, setPreviewImg] = useState(product.img[0]);

    const [descriptionExpand, setDescriptionExpand] = useState(false);

    const [color, setColor] = useState(undefined);

    const [capacity, setCapacity] = useState(undefined);

    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
        }
    };

    useEffect(() => {
        setPreviewImg(product.img[0]);
        setQuantity(1);
        setColor(undefined);
        setCapacity(undefined);
    }, [product]);

    const check = () => {
        if (color === undefined) {
            alert('Vui lòng chọn màu sắc!');
            return false;
        }

        if (capacity === undefined) {
            alert('Vui lòng chọn dung lượng!');
            return false;
        }

        return true;
    };

    const isStock = () => {
        if (products) {
            const prod = products.find((e) => {
                if (e.capacity.includes(capacity) && e.color === color && e.name === product.name)
                    return true;
                return false;
            });
            if (prod) return false;
            return true;
        }
        return true;
    };

    const addToCart = () => {
        if (check()) {
            let newItem = {
                slug: slugify(product.name.toLowerCase()),
                color: color,
                capacity: capacity,
                price: product.price,
                quantity: quantity,
            };
            if (isStock()) {
                toast.error('Out of Stock', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                if (dispatch(addItem(newItem))) {
                    toast.success('Added a product!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                } else {
                    toast.error('Error!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
            }
        }
    };

    const goToCart = () => {
        if (check()) {
            let newItem = {
                slug: slugify(product.name.toLowerCase()),
                color: color,
                capacity: capacity,
                price: product.price,
                quantity: quantity,
            };
            if (dispatch(addItem(newItem))) {
                dispatch(remove());
                props.history.push('/cart');
            } else {
                alert('Fail');
            }
        }
    };

    return (
        <div className='product'>
            <div className='product__images'>
                <div className='product__images__list'>
                    <div
                        className='product__images__list__item'
                        onClick={() => setPreviewImg(product.img[0])}
                    >
                        <img src={`http://localhost:3001/assets/${product.img[0]}.png`} alt='' />
                    </div>
                    <div
                        className='product__images__list__item'
                        onClick={() => setPreviewImg(product.img[1])}
                    >
                        <img src={`http://localhost:3001/assets/${product.img[1]}.png`} alt='' />
                    </div>
                </div>
                <div className='product__images__main'>
                    <img src={`http://localhost:3001/assets/${previewImg}.png`} alt='' />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className='product-description__title'>Chi tiết sản phẩm</div>
                    <div
                        className='product-description__content'
                        dangerouslySetInnerHTML={{__html: product.description}}
                    ></div>
                    <div className='product-description__toggle'>
                        <Button size='sm' onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className='product__info'>
                <h1 className='product__info__title'>{product.name}</h1>
                <div className='product__info__item'>
                    <span className='product__info__item__price'>
                        {numberWithCommas(product.price)}
                    </span>
                </div>
                <div className='product__info__item'>
                    <div className='product__info__item__title'>Màu sắc</div>
                    <div className='product__info__item__list'>
                        {colors.map((item, index) => (
                            <div
                                key={index}
                                className={`product__info__item__list__item ${
                                    color === item ? 'active' : ''
                                }`}
                                onClick={() => setColor(item)}
                            >
                                <div className={`circle bg-${item}-prod`}></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='product__info__item'>
                    <div className='product__info__item__title'>Dung lượng</div>
                    <div className='product__info__item__list'>
                        {capacities.map((item, index) => (
                            <div
                                key={index}
                                className={`product__info__item__list__item ${
                                    capacity === item ? 'active' : ''
                                }`}
                                onClick={() => setCapacity(item)}
                            >
                                <span className='product__info__item__list__item__size'>
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='product__info__item'>
                    <div className='product__info__item__title'>Số lượng</div>
                    <div className='product__info__item__quantity'>
                        <div
                            className='product__info__item__quantity__btn'
                            onClick={() => updateQuantity('minus')}
                        >
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className='product__info__item__quantity__input'>{quantity}</div>
                        <div
                            className='product__info__item__quantity__btn'
                            onClick={() => updateQuantity('plus')}
                        >
                            <i className='bx bx-plus'></i>
                        </div>
                    </div>
                </div>
                <div className='product__info__item'>
                    <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>mua ngay</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className='product-description__title'>Chi tiết sản phẩm</div>
                <div
                    className='product-description__content'
                    dangerouslySetInnerHTML={{__html: product.description}}
                ></div>
                <div className='product-description__toggle'>
                    <Button size='sm' onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                </div>
            </div>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </div>
    );
};

ProductView.propTypes = {
    product: PropTypes.object,
};

export default withRouter(ProductView);

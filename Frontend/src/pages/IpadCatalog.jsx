import React, { useCallback, useState, useEffect, useRef } from 'react'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/ipad-category'
import colors from '../assets/fake-data/product-color'
import capacity from '../assets/fake-data/product-capacity';
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'
import { useQuery } from 'react-query';
import productApi from '../api/productApi';
import ClipLoader from 'react-spinners/ClipLoader'
import slugify from 'slugify'
import Pagination from '../components/Pagination'

const IpadCatalog = () => {

    const initFilter = {
        category: [],
        color: [],
        capacity: []
    }

    const fetchProductData = async () => {
        const res = await productApi.getListProductByName('ipad');
        return res.data;
    }

    const productQuery = useQuery('product', fetchProductData);

    
    const [productList, setProductList] = useState([]);
    
    const [products, setProducts] = useState(productList);

    useEffect(() => {
        if (productQuery.data) {
            setProductList(productQuery.data);
            setProducts(productQuery.data);
        }
        else {
            setProductList([]);
            setProducts([]);
        }
    }, [productQuery.data]);

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categorySlug]})
                    break
                case "COLOR":
                    setFilter({...filter, color: [...filter.color, item.color]})
                    break
                case "CAPACITY":
                    setFilter({...filter, capacity: [...filter.capacity, item.capacity]})
                    break
                default:
            }
        } else {
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({...filter, color: newColor})
                    break
                case "CAPACITY":
                    const newCapacity = filter.capacity.filter(e => e !== item.capacity)
                    console.log(newCapacity);
                    setFilter({...filter, capacity: newCapacity})
                    break
                default:
            }
        }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(slugify(e.name.toLowerCase())))
            }

            if (filter.color.length > 0) {
                temp = temp.filter(e => {
                    const check =  filter.color.includes(e.color);
                    return check;
                })
            }

            if (filter.capacity.length > 0) {
                temp = temp.filter(e => {
                    const check = filter.capacity.includes(e.capacity);
                    return check;
                })
            }
            setProducts(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    

    if (productQuery.isLoading) {
        <ClipLoader color={'#427782'}/>
    }

    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            màu sắc
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                colors.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("COLOR", input.checked, item)}
                                            checked={filter.color.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            dung lượng 
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                capacity.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CAPACITY", input.checked, item)}
                                            checked={filter.capacity.includes(item.capacity)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList
                        data={products}
                    />
                </div>
            </div>
        </Helmet>
    )
}

export default IpadCatalog

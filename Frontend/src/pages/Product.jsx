import React, {useEffect, useState} from 'react';

import Helmet from '../components/Helmet';
import Section, {SectionBody, SectionTitle} from '../components/Section';
import Grid from '../components/Grid';
import ProductCard from '../components/ProductCard';
import ProductView from '../components/ProductView';

import {useQuery} from 'react-query';
import productApi from '../api/productApi';
import {useParams} from 'react-router-dom';
import slugify from 'slugify';
import ClipLoader from 'react-spinners/ClipLoader';

const Product = (props) => {
    const {id} = useParams();
    const fetchData = async () => {
        const res = await productApi.getProductById(id);
        return res.data;
    };

    const fetchListData = async () => {
        const res = await productApi.getListProduct();
        return res.data;
    };

    const initProduct = {
        id: '',
        code: '',
        capacity: '',
        color: '',
        description: '',
        shortDescription: '',
        img: ['iphone-13-blue1', 'iphone-13-blue2'],
        isShell: '',
        name: '',
        price: '',
        purchasePrice: '',
        quantity: '',
        uniId: '',
    };

    const [product, setProduct] = useState(initProduct);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const productQuery = useQuery(`product-${id}`, fetchData);
    const listProductQuery = useQuery('relatedProduct', fetchListData);
    useEffect(() => {
        if (productQuery.data && listProductQuery.data) {
            setProduct(productQuery.data);
            setRelatedProducts(listProductQuery.data.slice(-8));
        } else {
            setProduct(initProduct);
            setRelatedProducts([]);
        }
    }, [listProductQuery.data, productQuery.data]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);
    if (productQuery.isLoading) {
        return <ClipLoader color={'#427782'} />;
    } else
        return (
            <Helmet title={product.shortDescription}>
                <Section>
                    <SectionBody>
                        <ProductView product={product} />
                    </SectionBody>
                </Section>
                <Section>
                    <SectionTitle>Khám phá thêm</SectionTitle>
                    <SectionBody>
                        <Grid col={4} mdCol={2} smCol={1} gap={20}>
                            {relatedProducts.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.img[0]}
                                    img02={item.img.length < 2 ? item.img[0] : item.img[1]}
                                    name={item.name + ' ' + item.capacity}
                                    price={Number(item.price)}
                                    slug={slugify(item.name.toLowerCase())}
                                    idx={item.id}
                                />
                            ))}
                        </Grid>
                    </SectionBody>
                </Section>
            </Helmet>
        );
};

export default Product;

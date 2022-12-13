import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'

import policy from '../assets/fake-data/policy'
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.webp';
import banner4 from '../assets/images/banner4.webp';
import banner5 from '../assets/images/banner5.webp';
import banner6 from '../assets/images/banner6.webp';
import {useQuery} from 'react-query';
import productApi from '../api/productApi'
import ClipLoader from 'react-spinners/ClipLoader';
import slugify from 'slugify'

const Home = () => {
    const [productData, setProductData] = useState([]);

    const getProducts = count => {
        if (productQuery.data) {
            const max = productQuery.data.length - count
            const min = 0
            const start = Math.floor(Math.random() * (max - min) + min)
            return productQuery.data.slice(start, start + count)
        }
        return [];
    }
    const fetchSliderData = async () => {
        const res = await productApi.getSliderProduct();
        return res.data;
    };
    const fetchProductData = async () => {
        const res = await productApi.getListProduct();
        return res.data;
    }
    const productQuery = useQuery('product', fetchProductData);
    const sliderQuery = useQuery('productSlider', fetchSliderData);
    useEffect(() => {
        if (productQuery.data)
            setProductData(productQuery.data.slice(-4));
        else
            setProductData([]);
        console.log(productData);
    }, [productQuery.data]);
    if (productQuery.isLoading || sliderQuery.isLoading) {
        <ClipLoader color={'#427782'}/>
    }
    if (productQuery.isError) {
        <div>{productQuery.error}</div>
    }
    if (sliderQuery.isError) {
        <div>{sliderQuery.error}</div>
    }
    return (
        <Helmet title="Trang chủ">
            {/* hero slider */}
            <HeroSlider
                data={sliderQuery.data || []}
                control={true}
                auto={false}
                timeOut={5000}
            />
            {/* end hero slider */}

            {/* policy section */}
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            policy.map((item, index) => <Link key={index} to="/policy">
                                <PolicyCard
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Link>)
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end policy section */}

            {/* best selling section */}
            <Section>
                <SectionTitle>
                    top sản phẩm bán chạy trong tuần
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            productData.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.img[0]}
                                    img02={item.img.length < 2 ? item.img[0] : item.img[1]}
                                    name={item.name + ' ' + item.capacity}
                                    price={Number(item.price)}
                                    slug={slugify(item.name.toLowerCase())}
                                    idx={item.id}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end best selling section */}
            {/* banner 1 */}
            <Section>
                <SectionBody>
                    <div className='banner__group'>
                        <Link to='/'>
                            <img src={banner3} alt="" />
                        </Link>
                        <Link to='/'>
                            <img src={banner4} alt="" />
                        </Link>
                        <Link to='/'>
                            <img src={banner5} alt="" />
                        </Link>
                        <Link to='/'>
                            <img src={banner6} alt="" />
                        </Link>
                    </div>
                </SectionBody>
            </Section>
            {/** end banner1 */}
            {/* new arrival section */}
            <Section>
                <SectionTitle>
                    sản phẩm mới
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            getProducts(8).map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.img[0]}
                                    img02={item.img.length < 2 ? item.img[0] : item.img[1]}
                                    name={item.name + ' ' + item.capacity}
                                    price={Number(item.price)}
                                    slug={slugify(item.name.toLowerCase())}
                                    idx={item.id}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end new arrival section */}
            
            {/* banner */}
            <Section>
                <SectionBody>
                    <div className='banner__group'>
                        <Link to="/catalog">
                            <img src={banner1} alt="" />
                        </Link>
                        <Link to="/catalog">
                            <img src={banner2} alt="" />
                        </Link>
                    </div>
                </SectionBody>
            </Section>
            {/* end banner */}

            {/* popular product section */}
            <Section>
                <SectionTitle>
                    phổ biến
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            getProducts(12).map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.img[0]}
                                    img02={item.img.length < 2 ? item.img[0] : item.img[1]}
                                    name={item.name + ' ' + item.capacity}
                                    price={Number(item.price)}
                                    slug={slugify(item.name.toLowerCase())}
                                    idx={item.id}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end popular product section */}
        </Helmet>
    )
}

export default Home

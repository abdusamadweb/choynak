import './Countryes.scss'
import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import {lang} from "../../../assets/scripts/global";
import $api from "../../../api/apiConfig";
import LangText from "../../../components/lang/LangText";
import LoadImg from "../../../components/load-img/LoadImg";

const Countryes = () => {


    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get('/countries')
            .then(res => {
                setResult(res.data)
            })
    }, [])


    return (
        <div className='country'>
            <div className="container">
                <div className="country__inner">
                    <div className='titles row between align-center g1 mb2'>
                        <h2 className="country__title">
                            <LangText txt={'Explore the best places to study:'} />
                        </h2>
                        <Link className='country__link' to='/countries'>
                            {
                                lang === 'ru'? 'Смотреть все ' : 'View all '
                            }
                            <i className="fa-solid fa-chevron-right"/>
                        </Link>
                    </div>
                    <Swiper
                        grabCursor={true}
                        slidesPerView={3}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        breakpoints={{
                            0: {
                                slidesPerView: 'auto',
                                spaceBetween: 12,
                                centeredSlides: true,
                            },
                            600: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                        }}
                        className="swiper"
                    >
                        {
                            result?.map(i => (
                                <SwiperSlide className='item' key={i.id}>
                                    <Link className='item__link item__link1' to={`/countries/${i.name?.toLowerCase()}`}>
                                        <LoadImg url={i.mainImg?.full_url} />
                                        <div className="bg2 grid-center">
                                            <span className='txt'>{ i.name }</span>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <Link className='country__link link2' to='/countries'>
                        {
                            lang === 'ru'? 'Смотреть все ' : 'View all '
                        }
                        <i className="fa-solid fa-chevron-right"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Countryes

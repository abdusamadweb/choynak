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

const Universities = () => {


    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get('/university')
            .then(res => {
                setResult(res.data)
            })
    }, [])


    return (
        <div className='country univer'>
            <div className="container">
                <div className="country__inner">
                    <div className='titles row between align-center g1 mb2'>
                        <h2 className="country__title">
                            <LangText txt={'Top Universities to Study'} />
                        </h2>
                        <Link className='country__link' to='/universities'>
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
                                slidesPerView: 1,
                                spaceBetween: 16,
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
                                    <Link className='item__link' to={`/universities/${i.name.toLowerCase()}`}>
                                        <LoadImg url={i.mainImg?.full_url} />
                                        <div className="item__titles">
                                            <h3 className="title">
                                                {
                                                    lang === 'ru'? 'Университет ' : 'University '
                                                }
                                                { i.name }
                                            </h3>
                                            <div className='flag'>
                                                <img src={i?.country?.logo?.full_url} alt="flags"/>
                                                <span>{ i?.country?.name }</span>
                                            </div>
                                        </div>
                                        <div className="bg"/>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <ul className="list">
                        {
                            result?.slice(0, 4)?.map(i => (
                                <li className='item' key={i.id}>
                                    <Link className='item__link' to={`/universities/${i.name.toLowerCase()}`}>
                                        <LoadImg url={i.mainImg?.full_url} />
                                        <div className="item__titles">
                                            <h3 className="title">
                                                {
                                                    lang === 'ru'? 'Университет ' : 'University '
                                                }
                                                { i.name }
                                            </h3>
                                            <div className='flag'>
                                                <img src={i?.country?.logo?.full_url} alt="flags"/>
                                                <span>{ i?.country?.name }</span>
                                            </div>
                                        </div>
                                        <div className="bg"/>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <Link className='country__link link2' to='/universities'>
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

export default Universities

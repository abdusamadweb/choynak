import './HomeHero.scss'
import React, {useEffect, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Autoplay, EffectFade, Navigation, Pagination} from 'swiper/modules';
import {Link} from "react-router-dom";
import {lang} from "../../../assets/scripts/global";
import $api from "../../../api/apiConfig";
import {useLoader} from "../../../context/LoaderProvider";
import LoaderContent from "../../../components/loader/LoaderContent";

const HomeHero = () => {


    const { isLoading, setIsLoading } = useLoader()

    // slider data
    const [result, setResult] = useState([])
    useEffect(() => {
        setIsLoading(true)
        $api
            .get('/slayder')
            .then(res => {
                setResult(res.data)
                setIsLoading(false)
            })
    }, [setIsLoading])


    return (
        <div className='hero'>
            <div className="container">

                {
                    isLoading ?
                        <LoaderContent />
                        :
                        <Swiper
                            effect={'fade'}
                            loop={true}
                            grabCursor={true}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[EffectFade, Navigation, Pagination, Autoplay]}
                            className="swiper"
                        >
                            {
                                result.map(i => (
                                    <SwiperSlide key={i.link} style={{backgroundImage: `url(${i.image?.full_url})`}}>
                                        <div className='swiper__titles'>
                                            <h2 className="title">{ lang === 'ru' ? i.titleRu : i.titleEn }</h2>
                                            <p className="desc">{ lang === 'ru' ? i.descRu : i.descEn }</p>
                                            <Link className='btn' to={`${i.buttonPath}#form`}>{ lang === 'ru' ? 'Подать заявку' : 'Submit application' }</Link>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                }
            </div>
        </div>
    )
}

export default HomeHero

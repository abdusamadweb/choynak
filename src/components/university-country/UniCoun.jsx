import './UniCoun.scss'
import React, {useEffect, useState} from 'react'
import StudentUniversities from "../universities/StudentUniversities";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import {lang} from "../../assets/scripts/global";
import $api from "../../api/apiConfig";
import LoadImg from "../load-img/LoadImg";
import {toast} from "react-hot-toast";
import axios from "axios";

const UniCoun = ({
     id,
     result,
     title,
     univer,
     desc,
     logo,
     mainImg,
     images,
     youtube,
     intake1,
     intake2,
     intake3,
     intake4,
     intake5,
     universityId,
    universityName
}) => {


    const [readMore, setReadMore] = useState(false)


    // form data
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [program, setProgram] = useState([])
    const [programPrice, setProgramPrice] = useState([])

    const postFormData = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('fullName', name)
        formData.append('phoneNumber', phoneNumber)
        formData.append('email', email)
        formData.append('university', universityId)
        formData.append('program', program?.id)
        formData.append('programPrice', programPrice ? programPrice?.id : programPrices?.[0]?.id)
        formData.append('confirm', 'false')

        axios
            .post('https://api.choynak.org/api/e5211d4e897f44198925b679e91bf0f0/university-application', formData, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer OuaeLM2a2OuPJqutOOS40kFSjqmKPd4cj5g5tj84'
                }
        })
            .then(() => {
                toast.success(lang === 'ru' ? 'Ваша заявка принята!' : 'Your application has been accepted!')

                setName('')
                setPhoneNumber('')
                setEmail('')
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
            })
    }


    // program data
    const [navActive, setNavActive] = useState(0)

    const [programPrices, setProgramPrices] = useState([])
    useEffect(() => {
        $api
            .get(`/program-price?whereRelation[university][name]=${universityName}&whereRelation[program][name]=${program?.name}`)
            .then(res => {
                setProgramPrices(res.data)
            })
    }, [program?.name, universityName])


    // set default programs
    useEffect(() => {
        setProgram(result?.program?.[0])
        setProgramPrice(programPrices?.[0])
    }, [result?.program])


    // slider
    const [slide, setSlide] = useState(0)
    const [slideActive, setSlideActive] = useState(0)


    // universities rank
    const [ranks, setRanks] = useState([])
    useEffect(() => {
        $api
            .get(`/university?whereRelation[country][name]=${id}`)
            .then(res => setRanks(res.data))
    }, [id, title])


    return (
        <div className='unicoun'>
            <div className="container">
                <LoadImg url={mainImg} className={'unicoun__img'} />
                <div className="unicoun__inner">
                    <div className='wrapper'>
                        <div className="wrapper__titles row between align-center g1">
                            <div className='row align-center g1'>
                                <LoadImg url={logo} />
                                <div>
                                    <h2 className="title">{ title }</h2>
                                    {
                                        univer &&
                                        <span className='txt'>{ univer }</span>
                                    }
                                </div>
                            </div>
                            {/*<button className='share'>*/}
                            {/*    <i className="fa-solid fa-share-nodes"/>*/}
                            {/*</button>*/}
                        </div>
                        <div className="wrapper__descs">
                            <p className={`desc ${readMore ? 'show' : ''}`}>{ desc }</p>
                            <button className='read-more' onClick={() => setReadMore(!readMore)}>{ lang === 'ru' ? 'Подробнее' : 'Read more' }</button>
                        </div>
                        {
                            !univer ?
                                <div className="wrapper__universities">
                                    <div className="prices">
                                        <div className="prices__item">
                                            <i className="fa-regular fa-calendar-days"/>
                                            <div>
                                                <span className="title">{ intake1 }</span>
                                                <p className='desc'>{ lang === 'ru' ? 'Воздухозаборники' : 'Intakes' }</p>
                                            </div>
                                        </div>
                                        <div className="prices__item">
                                            <i className="fa-solid fa-building-columns"/>
                                            <div>
                                                <span className="title">{ intake2 }</span>
                                                <p className='desc'>{ lang === 'ru' ? 'Университеты-партнеры' : 'Partner Universities' }</p>
                                            </div>
                                        </div>
                                        <div className="prices__item">
                                            <i className="fa-solid fa-money-check-dollar"/>
                                            <div>
                                                <span className="title">{ intake3 }</span>
                                                <p className='desc'>{ lang === 'ru' ? 'Ежегодная плата за обучение' : 'Annual tuition fees' }</p>
                                            </div>
                                        </div>
                                        <div className="prices__item">
                                            <i className="fa-solid fa-graduation-cap"/>
                                            <div>
                                                <span className="title">{ intake4 }</span>
                                                <p className='desc'>{ lang === 'ru' ? 'Иностранные студенты' : 'International students' }</p>
                                            </div>
                                        </div>
                                        <div className="prices__item">
                                            <i className="fa-solid fa-bed-pulse"/>
                                            <div>
                                                <span className="title">{ intake5 }</span>
                                                <p className='desc'>{ lang === 'ru' ? 'Ежемесячные расходы на проживание' : 'Monthly living costs' }</p>
                                            </div>
                                        </div>
                                    </div>
                                    <StudentUniversities country={id} />
                                </div>
                                :
                                <div className="wrapper__courses">
                                    <h3 className="title row align-center g1">
                                        <i className="fa-solid fa-graduation-cap"/>
                                        <span>{ lang === 'ru' ? 'Курсы' : 'Courses' }</span>
                                    </h3>
                                    <div className="navs row align-center g1">
                                        {
                                            result?.program?.map((i, num) => (
                                                <button
                                                    className={`navs__btn ${navActive === num ? 'active' : ''}`}
                                                    key={i.id}
                                                    onClick={() => {
                                                        setNavActive(num)
                                                        setProgram(i)
                                                    }}
                                                >
                                                    { lang === 'ru' ? i.nameRu : i.name }
                                                </button>
                                            ))
                                        }
                                    </div>
                                    <ul className='list'>
                                        {
                                            programPrices?.map(i => (
                                                <li
                                                    className={`list__item ${programPrice?.id === i.id ? 'active' : ''}`}
                                                    key={i.id}
                                                    onClick={() => setProgramPrice(i)}
                                                >
                                                    <span className='name'>{ lang === 'ru' ? i.nameRu : i.name }</span>
                                                    <span className='price'>{ i.price }</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                        }
                    </div>
                    <div className="diver">
                        <iframe
                            className='diver__video'
                            src={youtube}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen={true}
                        />
                        <div className="diver__imgs">
                            <LoadImg url={images?.[slideActive].full_url} />
                            <div className='wrap'>
                                <div className='relative'>
                                    <div className="slider" style={{left: `${slide}%`}}>
                                        {
                                            images?.map((i, num) => (
                                                <LoadImg value={num} setValue={setSlideActive} url={i.full_url} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="btns">
                                    <button
                                        className='left'
                                        disabled={slide >= 0}
                                        onClick={() => setSlide(slide+49)}
                                    >
                                        <i className="fa-solid fa-chevron-left"/>
                                    </button>
                                    <button
                                        className='right'
                                        disabled={slide <= -49 * (images?.length - 2)}
                                        onClick={() => setSlide(slide-49)}
                                    >
                                        <i className="fa-solid fa-chevron-right"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            !univer ?
                                <div className='diver__intakes'>
                                    <div className="head">
                                        <span className="head__title">Intakes { title }</span>
                                        <p className="head__desc">{ 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aspernatur commodi consectetur culpa dolorum illo illum iste sint temporibus!' } </p>
                                        <div className='table'>
                                            <div className="table__head grid">
                                                <span className='txt'>January</span>
                                                <span className='txt'>September</span>
                                            </div>
                                            <ul className="table__body">
                                                <li className="item grid">
                                                    <span className="txt">January</span>
                                                    <span className="txt">September</span>
                                                </li>
                                                <li className="item grid">
                                                    <span className="txt">September</span>
                                                    <span className="txt">January</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className='head__txt red'>Find out which intake in the { title } id right for you here.</p>
                                    </div>
                                    <div className="body">
                                        <span className="body__title">Top universities ti study in { title }</span>
                                        <p className='body__desc'>{ 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dolorum ea earum in, molestiae odio quaerat rem reprehenderit sed voluptate.' }</p>
                                        <div className="table">
                                            <div className="table__head grid">
                                                <span className="txt">#</span>
                                                <span className="txt">University</span>
                                                <span className="txt">Overall Score</span>
                                                <span className="txt">QS Rank 2024</span>
                                            </div>
                                            <ul className="table__body">
                                                {
                                                    ranks?.map((i, num) => (
                                                        <li className='item grid'>
                                                            <span className='txt'>{ num+1 }</span>
                                                            <span className='txt'>{ i.name }</span>
                                                            <span className='txt'>{ i.score }</span>
                                                            <span className='txt'>{ i.rank }</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                :
                                <form className="diver__form" onSubmit={postFormData}>
                                    <input
                                        className='inp'
                                        type="text"
                                        placeholder='Your full name:'
                                        required={true}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        className='inp'
                                        type="tel"
                                        placeholder='Your phone number:'
                                        required={true}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    <input
                                        className='inp'
                                        type="email"
                                        placeholder='Your email:'
                                        required={true}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button className="btn">{ lang === 'ru' ? 'Подать заявку' : 'Submit application' }</button>
                                </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniCoun

import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {lang} from "../../../assets/scripts/global";
import $api from "../../../api/apiConfig";
import {toast} from "react-hot-toast";
import {postAttachment} from "../../../api/apiResp";

const Registre = ({ univer, title, inpTitle, inpPlaceholder }) => {


    const [companyName, setCompanyName] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [post, setPost] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')

    const [site, setSite] = useState('')
    const [instagram, setInstagram] = useState('')
    const [telegram, setTelegram] = useState('')

    const postFormData = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('companyName', companyName)
        formData.append('fullName', name)
        formData.append('password', password)
        formData.append('post', post)

        formData.append('phoneNumber', phoneNumber)
        formData.append('email', email)
        formData.append('country', country)
        formData.append('city', city)
        formData.append('street', street)

        formData.append('site', site)
        formData.append('instagram', instagram)
        formData.append('telegram', telegram)

        $api
            .post(univer ? 'application-for-university' : 'application-for-consult', formData, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer Tad216tIaccvhAKVAd5TYssnZqM63IUBVwNiHFUM'
                }
            })
            .then(() => {
                toast.success(lang === 'ru' ? 'Ваша заявка принята!' : 'Your application has been accepted!')
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
            })
    }


    const location = useLocation()
    useEffect(() => {
        const formElement = document.getElementById('form')
        if (location.hash === '#form') {
            formElement.scrollIntoView({ behavior: 'smooth' })
        }
    }, [location])


    return (
        <div className='reg' id='form'>
            <div className="container">
                <h2 className="reg__title">{ title }:</h2>
                <form className="form" onSubmit={postFormData}>
                    <div>
                        <span className='txt'>{ inpTitle }:</span>
                        <div className='form__wrapper'>
                            <input
                                className='inp'
                                type="text"
                                placeholder={inpPlaceholder}
                                required={true}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="text"
                                placeholder='Your full name:'
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="password"
                                placeholder='Password:'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="text"
                                placeholder='Post:'
                                onChange={(e) => setPost(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Контактные данные' : 'Contact data' }:</span>
                        <div className="form__wrapper">
                            <input
                                className='inp'
                                type="tel"
                                placeholder='Phone number:'
                                required={true}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="email"
                                placeholder='Email:'
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form__wrapper'>
                            <input
                                className='inp'
                                type="text"
                                placeholder='Country:'
                                required={true}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="text"
                                placeholder='City:'
                                required={true}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="text"
                                placeholder='Street:'
                                required={true}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Веб-сайт и социальные сети' : 'Web site and social networks' }:</span>
                        <div className="form__wrapper">
                            <div className='social'>
                                <input
                                    className='inp'
                                    type="text"
                                    placeholder='Web site link:'
                                    required={true}
                                    onChange={(e) => setSite(e.target.value)}
                                />
                                <i className="fa-solid fa-globe"/>
                            </div>
                            <div className='social'>
                                <input
                                    className='inp'
                                    type="text"
                                    placeholder='Instagram profile link:'
                                    required={true}
                                    onChange={(e) => setInstagram(e.target.value)}
                                />
                                <i className="fa-brands fa-instagram"/>
                            </div>
                            <div className='social'>
                                <input
                                    className='inp'
                                    type="text"
                                    placeholder='Telegram channel link:'
                                    required={true}
                                    onChange={(e) => setTelegram(e.target.value)}
                                />
                                <i className="fa-brands fa-telegram"/>
                            </div>
                        </div>
                    </div>
                    <button className="btn">{ lang === 'ru' ? 'Отправить запрос' : 'Send a request' }</button>
                </form>
            </div>
        </div>
    )
}

export default Registre

import './AdminHeaderTop.scss'
import React, {useEffect, useState} from 'react'
import {useHref, useNavigate} from "react-router-dom";
import en from "../../../../assets/images/flags/us.svg";
import ru from "../../../../assets/images/flags/ru.svg";
import {changeLang, formatPhone, lang, me, userAdmin} from "../../../../assets/scripts/global";
import $api from "../../../../api/apiConfig";

const AdminHeaderTop = ({ general }) => {


    const href = useHref()


    // log out
    const navigate = useNavigate()
    const logOut = () => {
        window.location.reload()

        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('me')
    }


    // social media
    const [social, setSocial] = useState([])
    useEffect(() => {
        $api
            .get('/networking')
            .then(res => setSocial(res.data[0]))
    }, [])


    return (
        <div className={`header-top ${href.includes('admin') ? 'd-block' : 'd-none'}`}>
            <div className="container">
                <div className="header__inner row between align-center">
                    <div className='socials row align-center'>
                        <div className="row align-center g1">
                            <i className="fa-solid fa-square-phone"/>
                            <a className='tel' href={`tel: ${general?.phoneNumber}`}>{ formatPhone(general?.phoneNumber || '+998') }</a>
                        </div>
                        <div className="socials__links row align-center g1">
                            {
                                social?.instagram &&
                                <a className='link' href={social?.instagram} target='_blank'>
                                    <i className="fa-brands fa-instagram"/>
                                </a>
                            }
                            {
                                social?.facebook &&
                                <a className='link' href={social?.facebook} target='_blank'>
                                    <i className="fa-brands fa-facebook"/>
                                </a>
                            }
                            {
                                social?.telegram &&
                                <a className='link' href={social?.telegram} target='_blank'>
                                    <i className="fa-brands fa-telegram"/>
                                </a>
                            }
                        </div>
                    </div>
                    <div className='account row align-center g1'>
                        {
                            lang === 'ru' ?
                                <button className="lang" onClick={() => changeLang('en')}>
                                    <img className='img' src={en} alt="en"/>
                                </button>
                                :
                                <button className="lang" onClick={() => changeLang('ru')}>
                                    <img className='img' src={ru} alt="ru"/>
                                </button>
                        }
                        <div className="row g1">
                            <div className="profile row">
                                <i className="fa-regular fa-circle-user"/>
                                { (userAdmin?.role === 'student' ? me?.firstName + ' ' + me?.secondName : me?.companyName) || 'User Name' }
                            </div>
                            <button className="profile row" onClick={logOut}>
                                <i className="fa-solid fa-right-to-bracket"/>
                                { lang === 'ru' ? 'Выйти' : 'Log out' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHeaderTop

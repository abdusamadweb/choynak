import './AdminHeader.scss'
import React, {useState} from 'react'
import logo from "../../../../assets/images/logo.png";
import {Link, NavLink, useHref, useNavigate} from "react-router-dom";
import {changeLang, lang, me, userAdmin} from "../../../../assets/scripts/global";
import en from "../../../../assets/images/flags/us.svg";
import ru from "../../../../assets/images/flags/ru.svg";
import burgerClose from "../../../../assets/images/header-burger-close.png";
import burgerImg from "../../../../assets/images/header-burger.png";
import {navConsult, navStudent, navUniversity} from "../../../../assets/scripts/mockAPI";

const AdminHeader = ({ general }) => {


    const href = useHref()


    const [modal, setModal] = useState(false)


    // log out
    const navigate = useNavigate()
    const logOut = () => {
        window.location.reload()

        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('me')
    }


    return (
        <div className={`admin-header ${href.includes('admin') ? 'd-block' : 'd-none'}`}>
            <Link className='header__logo logo' to='/'>
                <img className='img' src={general?.logo?.full_url || logo} alt="logo"/>
            </Link>
            <div className="header__lang">
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
            </div>
            {
                modal ?
                    <button className='x-mark' onClick={() => setModal(false)}>
                        <img className='icon' src={burgerClose} alt="icon"/>
                    </button>
                    :
                    <button className='header__burger' onClick={() => setModal(true)}>
                        <img className='icon' src={burgerImg} alt="icon"/>
                    </button>
            }
            <ul className={`nav ${modal ? 'open' : ''}`}>
                {
                    userAdmin?.role === 'student' ? (
                        navStudent.map((i) => (
                            <li className="item" key={i.link} onClick={() => setModal(false)}>
                                <NavLink className="item__link" to={i.link}>
                                    <i className={i.icon} />
                                    <span>{i['name_' + lang]}</span>
                                </NavLink>
                            </li>
                        ))
                    ) : userAdmin?.role === 'university' ? (
                        navUniversity.map((i) => (
                            <li className="item" key={i.link} onClick={() => setModal(false)}>
                                <NavLink className="item__link" to={i.link}>
                                    <i className={i.icon} />
                                    <span>{i['name_' + lang]}</span>
                                </NavLink>
                            </li>
                        ))
                    ) : userAdmin?.role === 'consult' && navConsult ? (
                        navConsult.map((i) => (
                            <li className="item" key={i.link} onClick={() => setModal(false)}>
                                <NavLink className="item__link" to={i.link}>
                                    <i className={i.icon} />
                                    <span>{i['name_' + lang]}</span>
                                </NavLink>
                            </li>
                        ))
                    ) : null
                }
                <div className="btns">
                    <button className="profile row">
                        <i className="fa-regular fa-circle-user"/>
                        { (userAdmin?.role === 'student' ? me?.firstName + ' ' + me?.secondName : me?.companyName) || 'User Name' }
                    </button>
                    <button className="profile row" onClick={logOut}>
                        <i className="fa-solid fa-right-to-bracket"/>
                        { lang === 'ru' ? 'Выйти' : 'Log out' }
                    </button>
                </div>
            </ul>
        </div>
    )
}

export default AdminHeader

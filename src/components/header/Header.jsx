import './Header.scss'
import React, {useEffect, useState} from 'react'
import {Link, useHref, useNavigate} from "react-router-dom"
import logo from '../../assets/images/logo.png'
import NavBar from "./NavBar"
import en from '../../assets/images/flags/us.svg'
import ru from '../../assets/images/flags/ru.svg'
import {changeLang, lang, me, userAdmin} from "../../assets/scripts/global"
import $api from "../../api/apiConfig"
import burgerImg from '../../assets/images/header-burger.png'
import burgerClose from "../../assets/images/header-burger-close.png";

const Header = ({ general }) => {


    const href = useHref()

    const [modal, setModal] = useState(false)


    // search data
    const [search, setSearch] = useState('')
    const [result, setResult] = useState([])
    const [debouncedSearch, setDebouncedSearch] = useState('')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search)
        }, 50)

        return () => clearTimeout(timeoutId)
    }, [search])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const universityResponse = await $api.get(`/university?where[name][like]=${debouncedSearch}`)
                const countryResponse = await $api.get(`/countries?where[name][like]=${debouncedSearch}`)

                setResult([...universityResponse.data, ...countryResponse.data])
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error)
            }
        }

        fetchData()
    }, [debouncedSearch])


    // log out
    const navigate = useNavigate()
    const logOut = () => {
        window.location.reload()

        localStorage.removeItem('token')
        localStorage.removeItem('me')
    }


    return (
        <div className={`header ${href.includes('admin') && 'd-none'}`}>
            <div className="container">
                <div className="header__inner row between align-center">
                    <Link className='header__logo' to='/'>
                        <img className='img' src={general?.logo?.full_url || logo} alt="logo"/>
                    </Link>
                    <div className='header__inps'>
                        <input
                            className='inp'
                            type="search"
                            placeholder={ lang === 'ru' ? 'Ищите университеты, страны...' : 'Search universities, countries...' }
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <i className="fa-solid fa-magnifying-glass icon"/>
                        <ul className='list'>
                            {
                                result?.slice(0, 6)?.map(i => (
                                    <li className='item'>
                                        <Link
                                            className='item__link row align-center'
                                            to={i?.country ? `/universities/${i.name}` : `/countries/${i.name}`}
                                        >
                                            <img className='img' src={i.logo?.full_url} alt="img"/>
                                            <div>
                                                <span className='title'>{ i.name }</span>
                                                <span className='desc'>{ i?.country ? (lang === 'ru' ? 'Университеты' : 'Universities') : (lang === 'ru' ? 'Страны' : 'Countries') }</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <NavBar
                        modal={modal}
                        setModal={setModal}
                        result={result}
                        setSearch={setSearch}
                        general={general}
                        logOut={logOut}
                    />
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
                        !me ?
                            <div className="header__btns row align-center">
                                <Link className='header__btn search' to='/login'>
                                    { lang === 'ru' ? 'Логин' : 'Login' }
                                </Link>
                                <Link className='header__btn' to='/for-students#form'>
                                    { lang === 'ru' ? 'Регистрация студента' : 'Student Register' }
                                </Link>
                            </div>
                            :
                            <div className="header__btns row btns">
                                <button className="header__btn profile row" onClick={() => navigate('/admin')}>
                                    <i className="fa-regular fa-circle-user"/>
                                    <span>
                                        { (userAdmin?.role === 'student' ? me?.firstName + ' ' + me?.secondName : me?.companyName) || 'User Name' }
                                    </span>
                                </button>
                                <button className="header__btn profile row" onClick={logOut}>
                                    <i className="fa-solid fa-right-to-bracket"/>
                                    <span>{ lang === 'ru' ? 'Выйти' : 'Log out' }</span>
                                </button>
                            </div>
                    }
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
                </div>
            </div>
        </div>
    )
}

export default Header

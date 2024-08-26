import React from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom"
import {lang, me, userAdmin} from "../../assets/scripts/global"

const NavBar = ({ modal, setModal, result, setSearch, logOut }) => {

    const navigate = useNavigate()


    const navLink = [
        {
            name_en: 'For students',
            name_ru: 'Для студентов',
            link: '/for-students'
        },
        {
            name_en: 'For agents',
            name_ru: 'Для консультантов',
            link: '/for-consults'
        },
        {
            name_en: 'For universities',
            name_ru: 'Для университетов',
            link: '/for-universities'
        },
        {
            name_en: 'Countries',
            name_ru: 'Страны',
            link: '/countries'
        },
        {
            name_en: 'Universities',
            name_ru: 'Университеты',
            link: '/universities'
        },
    ]


    return (
        <nav className={`nav ${modal ? 'open' : ''}`}>
            <div className='header__inps inps2'>
                <input
                    className='inp'
                    type="search"
                    placeholder={ lang === 'ru' ? 'Ищите университеты, страны...' : 'Search universities, countries...' }
                    onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass icon"/>
                <ul className='list'>
                    {
                        result?.slice(0, 5).map(i => (
                            <li className='item' onClick={() => setModal(false)}>
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
            <div className="wrapper row align-center">
                <ul className='nav__list row align-center'>
                    {
                        navLink.slice(0, 3)?.map(i => (
                            <li
                                className="item"
                                key={i.link}
                                onClick={() => setModal(false)}
                            >
                                <NavLink className='item__link' to={`${i.link}`}>{ i['name_' + lang] }</NavLink>
                            </li>
                        ))
                    }
                </ul>
                {
                    !me ?
                        <div className="header__btns row align-center">
                            <Link
                                className='header__btn'
                                to='/login'
                                onClick={() => setModal(false)}
                            >
                                { lang === 'ru' ? 'Логин' : 'Login' }
                            </Link>
                            <Link
                                className='header__btn'
                                to='/for-students#form'
                                onClick={() => setModal(false)}
                            >
                                { lang === 'ru' ? 'Регистрация студента' : 'Student Register' }
                            </Link>
                        </div>
                        :
                        <div className="header__btns row btns">
                            <button className="header__btn profile row" onClick={() => navigate('/admin')}>
                                <i className="fa-regular fa-circle-user"/>
                                <span>
                                        { (userAdmin?.role === 'student' ? me?.firstName + ' ' + me?.secondName : me?.companyName) || 'User Name' }</span>
                            </button>
                            <button className="header__btn profile row" onClick={logOut}>
                                <i className="fa-solid fa-right-to-bracket"/>
                                <span>{ lang === 'ru' ? 'Выйти' : 'Log out' }</span>
                            </button>
                        </div>
                }
            </div>
        </nav>
    )
}

export default NavBar

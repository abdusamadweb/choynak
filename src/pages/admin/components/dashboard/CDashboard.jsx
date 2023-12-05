import './CDashboard.scss'
import React from 'react'
import img from '../../../../assets/images/admin/dashboard-img.png'
import bg from '../../../../assets/images/admin/dashboard-bg-img.png'
import {lang, me, userAdmin} from "../../../../assets/scripts/global";

const CDashboard = ({ title1, title2, count1, count2, balance }) => {
    return (
        <div className='c-dashboard'>
            <div className="container">
                <div className="head row between">
                    <div className="head__titles">
                        <span className='title'>{ lang === 'ru' ? 'Привет' : 'Hello' } { me?.companyName || 'User Name' }!</span>
                        <p className='desc'>{ lang === 'ru' ? 'Мы желаем вам самого позитивного настроения' : 'We wish you the most positive mood' }.</p>
                    </div>
                    <img className='head__bg' src={bg} alt="bg"/>
                    <img className='head__img' src={img} alt="img"/>
                </div>
                <div className="body align-center">
                    {
                        !balance ?
                        <>
                            <div className="body__card">
                                <div className='row align-center g1 mb1'>
                                    <i className="fa-solid fa-user-graduate"/>
                                    <span>{ title1 }</span>
                                </div>
                                <span className='num'>{ count1 }</span>
                            </div>
                            <div className="body__card card2">
                                <div className='row align-center g1 mb1'>
                                    <i className="fa-solid fa-file-invoice"/>
                                    <span>{ title2 }</span>
                                </div>
                                <span className='num'>{ count2 } { userAdmin.role === 'consult' && ' $' }</span>
                            </div>
                        </>
                            :
                            <>
                                <div className="body__card card2">
                                    <div className='row align-center g1 mb1'>
                                        <i className="fa-solid fa-user-graduate"/>
                                        <span>{ title2 }</span>
                                    </div>
                                    <span className='num'>{ count2 } $</span>
                                </div>
                                <div className="wrapper">
                                    <p className='desc'>{ lang === 'ru' ? 'ОТПРАВИТЬ ЗАПРОС НА ВЫВОД СРЕДСТВ' : 'SEND A WITHDRAWAL REQUEST' }</p>
                                    <input
                                        className='inp'
                                        type="tel"
                                        placeholder='Enter the amount'
                                    />
                                    <button className="btnn">{ lang === 'ru' ? 'Отправить запрос' : 'Send request' }</button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CDashboard

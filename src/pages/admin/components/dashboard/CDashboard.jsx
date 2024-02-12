import './CDashboard.scss'
import React, {useState} from 'react'
import img from '../../../../assets/images/admin/dashboard-img.png'
import bg from '../../../../assets/images/admin/dashboard-bg-img.png'
import {lang, me, userAdmin} from "../../../../assets/scripts/global";
import $api from "../../../../api/apiConfig";
import {toast} from "react-hot-toast";

const CDashboard = ({ title1, title2, count1, count2, balance }) => {

    const [count, setCount] = useState('')

    const balanceRequest = () => {
        const item = {
            ...me,
            balanceRequest: count
        }
        $api
            .post(`/application-for-consult/update/${me.id}`, item, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer OuaeLM2a2OuPJqutOOS40kFSjqmKPd4cj5g5tj84'
                }
            })
            .then(() => {
                toast.success('Success!')
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
            })
    }


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
                                        type="number"
                                        placeholder='Enter the amount'
                                        onChange={(e) => setCount(e.target.value)}
                                    />
                                    <button className="btnn" onClick={balanceRequest}>
                                        { lang === 'ru' ? 'Отправить запрос' : 'Send request' }
                                    </button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CDashboard

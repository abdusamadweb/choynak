import './Faq.scss'
import React, {useEffect, useState} from 'react'
import {faqList} from "../../assets/scripts/mockAPI";
import FaqItem from "./FaqItem";
import {lang} from "../../assets/scripts/global";
import $api from "../../api/apiConfig";

const Faq = () => {


    const [answers, setAnswers] = useState([])
    useEffect(() => {
        $api
            .get('frequently-question')
            .then(res => {
                setAnswers(res.data)
            })
    }, [])


    return (
        <div className='faq'>
            <div className="bg"/>
            <div className="container">
                <div className="faq__inner">
                    <div/>
                    <div>
                        <div className='faq__titles'>
                            <span className='sub'>{ lang === 'ru' ? 'О проекте' : 'About project' }</span>
                            <h2 className="title">{ lang === 'ru' ? 'Часто задаваемые вопросы!' : 'Frequently Asked Questions!' }</h2>
                        </div>
                        <ul className='faq__list'>
                            {
                                answers?.map((i, num) => (
                                    <FaqItem i={i} num={num} key={i.id} />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq

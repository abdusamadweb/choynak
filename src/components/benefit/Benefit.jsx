import React, {useEffect, useState} from 'react'
import {lang} from "../../assets/scripts/global";
import $api from "../../api/apiConfig";
import LangText from "../lang/LangText";
import LoadImg from "../load-img/LoadImg";

const Benefit = ({ role }) => {


    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get(`/statistika-${role}`)
            .then(res => {
                setResult(res.data)
            })
    }, [role])


    return (
        <div className='container'>
            <div className="benefit">
                <h2 className="benefit__title">
                    <LangText txt={'What are the Benefits from us?'} />
                </h2>
                <ul className="benefit__list">
                    {
                        result?.map(i => (
                            <li className='item' key={i.name}>
                                <LoadImg className={'item__img'} url={i.logo.full_url} />
                                <span className='item__count'>{ i.count }+</span>
                                <span className='item__title'>{ lang === 'ru' ? i.titleRu : i.titleEn }</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Benefit

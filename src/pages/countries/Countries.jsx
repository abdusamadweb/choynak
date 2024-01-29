import './Countries.scss'
import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import StudentUniversities from "../../components/universities/StudentUniversities";
import uk from '../../assets/images/flags/gb.svg'
import {lang} from "../../assets/scripts/global";
import $api from "../../api/apiConfig";
import LangText from "../../components/lang/LangText";

const Countries = () => {


    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get('/countries')
            .then(res => {
                setResult(res.data)
            })
    }, [])


    return (
        <div className='universities countries'>
            <div className="container">
                <div className="universities__titles">
                    <h2 className="title">
                        <LangText txt={'Study abroad Not a dream anymore, dreams come true!'} />
                    </h2>
                    <p className="desc">
                        <LangText txt={'Is it difficult to choose? We\'ll help you. Leave a request soon!'} />
                    </p>
                    <Link className='btn' to='/for-students#form'>
                        {
                            lang === 'ru' ? 'Подать заявку' : 'Submit application'
                        }
                    </Link>
                </div>
                <ul className="universities__list">
                    {
                        result?.map(i => (
                            <li
                                className="item"
                                style={{backgroundImage: `url(${i.mainImg?.full_url})`}}
                            >
                                <div className="bg"/>
                                <Link className='item__link relative' to={i.name?.toLowerCase()}>
                                    <div className="relative">
                                        <img className='img' src={i.logo?.full_url} alt="img"/>
                                        <h3 className="title">{ i.name }</h3>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <StudentUniversities />
        </div>
    )
}

export default Countries

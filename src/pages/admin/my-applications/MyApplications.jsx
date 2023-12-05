import './MyApplications.scss'
import React, {useEffect, useState} from 'react'
import Table from "../components/table/Table";
import Titles from "../components/titles/Titles";
import {lang, userAdmin} from "../../../assets/scripts/global";
import $api from "../../../api/apiConfig";

const MyApplications = () => {


    const [effect, setEffect] = useState(false)
    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get(`/university-application?where[phoneNumber]=${encodeURIComponent(userAdmin.phoneNumber)}`)
            .then(res => setResult(res.data))
    }, [effect])


    return (
        <div className='my-applications admin-page'>
            <Titles title={lang === 'ru' ? 'Мои заявки' : 'My applications'} />
            <Table title={lang === 'ru' ? 'Мои заявки' : 'My applications'} list={result} setEffect={setEffect} />
        </div>
    )
}

export default MyApplications

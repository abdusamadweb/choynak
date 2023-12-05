import './MyStudents.scss'
import React, {useEffect, useState} from 'react'
import Titles from "../components/titles/Titles";
import Table from "./table/Table";
import {lang, me} from "../../../assets/scripts/global";
import $api from "../../../api/apiConfig";

const MyStudentsConsult = () => {


    const [effect, setEffect] = useState(false)
    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get(`/university-application?whereRelation[consultId][companyName]=${me?.companyName}`)
            .then(res => setResult(res.data))
    }, [effect])


    return (
        <div className='my-students admin-page'>
            <Titles title={lang === 'ru' ? 'Мои студенты' : 'My students'} />
            <Table title={lang === 'ru' ? 'Мои студенты' : 'My students'} list={result} setEffect={setEffect} />
        </div>
    )
}

export default MyStudentsConsult

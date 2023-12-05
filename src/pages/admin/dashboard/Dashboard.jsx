import React, {useEffect, useState} from 'react'
import Titles from "../components/titles/Titles";
import CDashboard from "../components/dashboard/CDashboard";
import {lang, me, userAdmin} from "../../../assets/scripts/global";
import StudentForm from "../student-form/StudentForm";
import $api from "../../../api/apiConfig";

const Dashboard = () => {


    const [effect, setEffect] = useState(false)
    const [mee, setMee] = useState([])
    useEffect(() => {
        $api
            .get(`application-for-${userAdmin?.role}?where[phoneNumber]=${encodeURIComponent(userAdmin?.phoneNumber)}`)
            .then(res => {
                setMee(res.data?.[0])
                localStorage.setItem('me', JSON?.stringify(res.data?.[0]))
            })
    }, [effect])


    // consult
    const [consult, setConsult] = useState([])
    useEffect(() => {
        $api
            .get(`/university-application?whereRelation[consultId][companyName]=${me?.companyName}`)
            .then(res => setConsult(res.data))
    }, [effect])


    // university
    const [university, setUniversity] = useState([])
    useEffect(() => {
        $api
            .get(`/university-application?whereRelation[university][name]=${me?.companyName}`)
            .then(res => setUniversity(res.data))
    }, [])


    return (
        <div className='dashboard admin-page'>
            {
                userAdmin?.role === 'student' ? <StudentForm setEffect={setEffect}/>
                    : userAdmin?.role === 'university' ?
                        <>
                            <Titles title={'Dashboard'}/>
                            <CDashboard
                                title1={lang === 'ru' ? 'ЗАПРОСЫ' : 'REQUESTS'}
                                title2={lang === 'ru' ? 'ПОДТВЕРЖДЕННЫЕ' : 'CONFIRMED'}
                                count1={university?.length || 0}
                                count2={me?.confirmed?.length || 0}
                            />
                        </>
                        : userAdmin?.role === 'consult' &&
                        <>
                            <Titles title={'Dashboard'}/>
                            <CDashboard
                                title1={lang === 'ru' ? 'СТУДЕНТОВ' : 'STUDENTS'}
                                title2={lang === 'ru' ? 'БАЛАНС' : 'BALANCE'}
                                count1={consult?.length || 0}
                                count2={me?.balance || 0}
                            />
                        </>
            }
        </div>
    )
}

export default Dashboard

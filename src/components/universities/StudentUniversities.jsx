import './StudentUniversities.scss'
import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {lang} from "../../assets/scripts/global";
import $api from "../../api/apiConfig";
import LangText from "../lang/LangText";
import LoadImg from "../load-img/LoadImg";
import MySelect from "../UI/my-select/MySelect";

const StudentUniversities = ({ country }) => {


    // select - countries
    const [countriesSl, setCountriesSl] = useState('')
    const [countries, setCountries] = useState([])
    useEffect(() => {
        $api
            .get(`/countries`)
            .then(res => setCountries(res.data))
    }, [])


    // select - direction
    const [directionSl, setDirectionSl] = useState('')
    const [direction, setDirection] = useState([])
    useEffect(() => {
        $api
            .get('/direction')
            .then(res => setDirection(res.data))
    }, [])


    // select - language
    const [languageSl, setLanguageSl] = useState('')
    const [language, setLanguage] = useState([])
    useEffect(() => {
        $api
            .get('/language')
            .then(res => setLanguage(res.data))
    }, [])


    // select - program
    const [programSl, setProgramSl] = useState('')
    const [program, setProgram] = useState([])
    useEffect(() => {
        $api
            .get('/program')
            .then(res => setProgram(res.data))
    }, [])


    // select - language-requirement
    const [requirementSl, setRequirementSl] = useState('')
    const [requirement, setRequirement] = useState([])
    useEffect(() => {
        $api
            .get('/languageRequirement')
            .then(res => setRequirement(res.data))
    }, [])


    // select - semester
    const [semesterSl, setSemesterSl] = useState('')
    const [semester, setSemester] = useState([])
    useEffect(() => {
        $api
            .get('/semester')
            .then(res => setSemester(res.data))
    }, [])


    // universities
    const [effect, setEffect] = useState(false)
    const [result, setResult] = useState([])
    useEffect(() => {
        let params = {
            'whereRelation[country][name]': country ? country : countriesSl,
            'whereRelation[direction][name]': directionSl,
            'whereRelation[language][name]': languageSl,
            'whereRelation[program][name]': programSl,
            'whereRelation[requirements][name]': requirementSl,
            'whereRelation[semester][name]': semesterSl,
        }

        let queryParams = Object.entries(params)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => `${key}=${value}`)
            .join('&')

        let url = `/university${queryParams ? '?' + queryParams : ''}`
        $api
            .get(url)
            .then(res => {
                setResult(res.data)
            })
    }, [effect])


    return (
        <div className='s-univer'>
            <div className="container">
                <h2 className="s-univer__title">
                    <LangText txt={'Universities to study'} />
                </h2>
                <div className="content">
                    <div className="content__selects">
                        <div className="row align-center g1">
                            {
                                !country &&
                                <MySelect className='select inp' setValue={setCountriesSl}>
                                    <option value="">{ lang === 'ru' ? 'Все страны' : 'All countries' }</option>
                                    {
                                        countries?.map(i => (
                                            <option value={i.name} key={i.name}>{ i.name }</option>
                                        ))
                                    }
                                </MySelect>
                            }
                            <MySelect className='select inp' setValue={setDirectionSl}>
                                <option value="">{ lang === 'ru' ? 'Направление' : 'Direction' }</option>
                                {
                                    direction?.map(i => (
                                        <option value={i.name}>{ i.name }</option>
                                    ))
                                }
                            </MySelect>
                            <MySelect className='select inp' setValue={setLanguageSl}>
                                <option value="">{ lang === 'ru' ? 'Язык' : 'Language' }</option>
                                {
                                    language?.map(i => (
                                        <option value={i.name}>{ i.name }</option>
                                    ))
                                }
                            </MySelect>
                            <MySelect className='select inp' setValue={setProgramSl}>
                                <option value="1">{ lang === 'ru' ? 'Учебная программа' : 'Training program' }</option>
                                {
                                    program?.map(i => (
                                        <option value={i.name}>{ i.name }</option>
                                    ))
                                }
                            </MySelect>
                            <MySelect className='select inp' setValue={setRequirementSl}>
                                <option value="1">{ lang === 'ru' ? 'Языковые требования' : 'Language requirements' }</option>
                                {
                                    requirement?.map(i => (
                                        <option value={i.name}>{ i.name }</option>
                                    ))
                                }
                            </MySelect>
                            <MySelect className='select inp' setValue={setSemesterSl}>
                                <option value="1">{ lang === 'ru' ? 'Начало семестра обучения' : 'Semester start of training' }</option>
                                {
                                    semester?.map(i => (
                                        <option value={i.name}>{ i.name }</option>
                                    ))
                                }
                            </MySelect>
                        </div>
                        <button className='btn' onClick={() => setEffect(!effect)}>{ lang === 'ru' ? 'Применять' : 'Apply' }</button>
                    </div>
                    <ul className="content__list">
                        {
                            result?.map(i => (
                                <li className='item' key={i.id}>
                                    <Link className='item__link' to={`/universities/${i.name.toLowerCase()}`}>
                                        <LoadImg url={i.mainImg?.full_url} />
                                        <div className="item__titles">
                                            <h3 className="title">
                                                {
                                                    lang === 'ru'? 'Университет ' : 'University '
                                                }
                                                { i.name }
                                            </h3>
                                            <div className='flag'>
                                                <img src={i.country?.logo?.full_url} alt="flags"/>
                                                <span>{ i.country?.name }</span>
                                            </div>
                                        </div>
                                        <div className="bg"/>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    {
                        result?.length > 6 &&
                        <button className='btn more'>Show more</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentUniversities

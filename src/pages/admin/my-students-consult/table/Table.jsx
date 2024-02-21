import React, {useEffect, useState} from 'react'
import {lang} from "../../../../assets/scripts/global";
import TableItem from "./TableItem";
import $api from "../../../../api/apiConfig";
import {toast} from "react-hot-toast";
import MySelect from "../../../../components/UI/my-select/MySelect";

const Table = ({title, list, setEffect}) => {

    const [university, setUniversity] = useState(null)
    const [program, setProgram] = useState(null)

    const [universities, setUniversities] = useState([])
    useEffect(() => {
        $api
            .get('/university')
            .then(res => {
                setUniversities(res.data)
                setUniversity(res.data?.[0]?.name)
            })
    }, [])


    const [programs, setPrograms] = useState([])
    useEffect(() => {
        if (university) {
            $api
                .get(`/university?where[name]=${university?.name}`)
                .then(res => setPrograms(res.data?.[0]?.program))
        }
    }, [university])


    const [programPrices, setProgramPrices] = useState([])
    useEffect(() => {
        if (university && program) {
            $api
                .get(`/program-price?whereRelation[university][name]=${university?.name}&whereRelation[program][name]=${program?.name}`)
                .then(res => setProgramPrices(res.data))
        }
    }, [program, university])


    const [modal, setModal] = useState(false)
    const addStudent = (e) => {
        e.preventDefault()

        const { fullName, phoneNumber, email, university, program, programPrice } = e.target.elements
        const item = {
            fullName: fullName.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            university: university.value,
            program: program.value,
            programPrice: programPrice.value,
            confirm: false
        }
        console.log(item, ' ITEM')

        $api
            .post('', item, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer OuaeLM2a2OuPJqutOOS40kFSjqmKPd4cj5g5tj84'
                }
            })
            .then(() => {
                toast.success('Success!')
                setEffect(prev => !prev)
                setModal(false)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
            })
    }
    console.log(program)


    return (
        <div className='table'>
            <div className='table__title'>{title}</div>
            <div className="body">
                <div className="body__txts grid">
                    <span className='txt'>№</span>
                    <span className='txt'>{lang === 'ru' ? 'ФИО СТУДЕНТА' : 'STUDENTS FULL NAME'}</span>
                    <span className='txt'>{lang === 'ru' ? 'НАЗВАНИЕ ВУЗа:' : 'NAME OF THE UNIVERSITY:'}</span>
                    <span className='txt'>{lang === 'ru' ? 'ФАКУЛЬТЕТ, ПРОГРАММА ОБУЧЕНИЯ:' : 'FACULTY, TRAINING PROGRAM:'}</span>
                    <span className='txt'>{lang === 'ru' ? 'Параметры' : 'Parameters'}</span>
                </div>
                <ul className='body__list'>
                    {
                        list?.map((i, num) => (
                            <TableItem i={i} num={num} setEffect={setEffect} key={i.id} />
                        ))
                    }
                </ul>
                <button className='add-btn' onClick={() => setModal(true)}>
                    {lang === 'ru' ? 'Добатиь студента' : 'Add student'}
                </button>
            </div>
            {
                modal &&
                <div className='modal add'>
                    <form className="form" onSubmit={addStudent}>
                        <span className='form__title'>Add student</span>
                        <label>
                            <span className='txt'>Full name:</span>
                            <input
                                className='inp'
                                type="text"
                                name="fullName"
                                placeholder='Full name...'
                                required={true}
                            />
                        </label>
                        <label>
                            <span className='txt'>Phone number:</span>
                            <input
                                className='inp'
                                type="text"
                                name="phoneNumber"
                                placeholder='Phone number...'
                                required={true}
                            />
                        </label>
                        <label>
                            <span className='txt'>Email:</span>
                            <input
                                className='inp'
                                type="text"
                                name="email"
                                placeholder='Email...'
                                required={true}
                            />
                        </label>
                        <div>
                            <label className="select" htmlFor="slct">
                                <span className='txt'>University:</span>
                                <select
                                    id="slct"
                                    className={'inp select'}
                                    name={'university'}
                                    onChange={(e) => setUniversity(universities?.find(u => u.id == e.target.value))}
                                >
                                    {
                                        universities?.map(i => (
                                            <option value={i.id} key={i.id}>{ lang === 'ru' ? i.nameRu : i.name }</option>
                                        ))
                                    }
                                </select>
                                <svg>
                                    <use xlinkHref="#select-arrow-down"/>
                                </svg>
                            </label>
                            <svg className="sprites">
                                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                    <polyline points="1 1 5 5 9 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                        {/*<label>*/}
                        {/*    <span className='txt'>University:</span>*/}
                        {/*    <MySelect name="university" className='inp select' setValue={setUniversity}>*/}
                        {/*        {*/}
                        {/*            universities?.map(i => (*/}
                        {/*                <option value={i.id} key={i.id}>{ lang === 'ru' ? i.nameRu : i.name }</option>*/}
                        {/*            ))*/}
                        {/*        }*/}
                        {/*    </MySelect>*/}
                        {/*</label>*/}

                        <div>
                            <label className="select" htmlFor="slct">
                                <span className='txt'>Program:</span>
                                <select
                                    id="slct"
                                    className={'inp select'}
                                    name={'program'}
                                    onChange={(e) => setProgram(programs?.find(u => u.id == e.target.value))}
                                >
                                    {
                                        programs?.map(i => (
                                            <option value={i.id} key={i.id}>{ lang === 'ru' ? i.nameRu : i.name }</option>
                                        ))
                                    }
                                </select>
                                <svg>
                                    <use xlinkHref="#select-arrow-down"/>
                                </svg>
                            </label>
                            <svg className="sprites">
                                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                                    <polyline points="1 1 5 5 9 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                        {/*<label>*/}
                        {/*    <span className='txt'>Program:</span>*/}
                        {/*    <MySelect name="program" className='inp select' setValue={setProgram}>*/}
                        {/*        {*/}
                        {/*            programs?.map(i => (*/}
                        {/*                <option value={i.name} key={i.id}>{ lang === 'ru' ? i.nameRu : i.name }</option>*/}
                        {/*            ))*/}
                        {/*        }*/}
                        {/*    </MySelect>*/}
                        {/*</label>*/}
                        <label>
                            <span className='txt'>Program price:</span>
                            <MySelect name="programPrice" className='inp select'>
                                {
                                    programPrices?.map(i => (
                                        <option value={i.id} key={i.id}>{ lang === 'ru' ? i.nameRu : i.name }</option>
                                    ))
                                }
                            </MySelect>
                        </label>
                        <button className='form__btn'>Submit</button>
                    </form>
                    <div className="bg" onClick={() => setModal(false)}/>
                </div>
            }
        </div>
    )
}

export default Table

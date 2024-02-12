import React, {useEffect, useRef, useState} from 'react'
import {lang} from "../../../../assets/scripts/global";
import $api from "../../../../api/apiConfig";
import {toast} from "react-hot-toast";
import MySelect from "../../../../components/UI/my-select/MySelect";

const TableItem = ({ i, num, setEffect }) => {


    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)

    const [univer, setUniver] = useState('')
    const [program, setProgram] = useState('')
    const [programName, setProgramName] = useState('')

    useEffect(() => {
        setUniver(i?.university?.id)
        setProgram(i?.program?.id)
        setProgramName(i?.programName?.id)
    }, [i?.program?.id, i?.programName?.id, i?.university?.id])


    //edit
    const editItem = (id) => {
        const formData = new FormData()
        formData.append('fullName', i.fullName)
        formData.append('phoneNumber', i.phoneNumber)
        formData.append('email', i.email)
        formData.append('confirm', i?.confirm)

        formData.append('university', univer)
        formData.append('program', program)
        formData.append('programName', programName)

        $api
            .post(`/university-application/update/${id}`, formData, {
                headers: { Authorization: 'Bearer OuaeLM2a2OuPJqutOOS40kFSjqmKPd4cj5g5tj84' }
            })
            .then(() => {
                toast.success('Success!')
                setEffect(prev => !prev)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
            })
    }


    // delete
    const delItem = (id) => {

        $api
            .delete(`university-application/${id}`, {
                headers: { Authorization: 'Bearer OuaeLM2a2OuPJqutOOS40kFSjqmKPd4cj5g5tj84' }
            })
            .then(() => {
                toast.success('Success!')
                setEffect(prev => !prev)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
            })
    }


    // get universities
    const [universities, setUniversities] = useState([])
    const [programs, setPrograms] = useState([])
    const [programsActive, setProgramsActive] = useState([])
    useEffect(() => {
        $api
            .get('/university')
            .then(res => setUniversities(res.data))

        $api
            .get('/program')
            .then(res => setPrograms(res.data))
    }, [])
    useEffect(() => {
        $api
            .get(`/program?where[id]=${program}`)
            .then(res => setProgramsActive(res.data?.length > 0 ? res.data?.[0] : programs?.[0]?.programPrices))
    }, [program, programs])


    return (
        <li className='item grid' key={i.id}>
            <span className='txt'>{num + 1}</span>
            <span className='txt'>{i?.university?.name}</span>
            <span className='txt'>{i?.program?.name}</span>
            <span className='txt'>{i?.programName?.name}</span>
            <div className='txt btns d-flex align-center'>
                <button
                    onClick={() => setModal(true)}>{lang === 'ru' ? 'Смотреть' : 'View'}</button>
                <button onClick={() => {
                    setModal(true)
                    setEdit(true)
                }}>{lang === 'ru' ? 'Изменить' : 'Change'}</button>
                <button
                    className='del'
                    onClick={() => setDel(true)}
                >
                    {lang === 'ru' ? 'Удалить' : 'Delete'}
                </button>
            </div>
            <div className='txt btns btns2 d-flex align-center'>
                <button onClick={() => setModal(true)}>
                    <i className="fa-solid fa-eye"/>
                </button>
                <button onClick={() => {
                    setModal(true)
                    setEdit(true)
                }}>
                    <i className="fa-solid fa-pen"/>
                </button>
                <button className='del' onClick={() => setDel(true)}>
                    <i className="fa-solid fa-trash-can"/>
                </button>
            </div>
            {
                modal &&
                <div className='modal'>
                    <div className='form'>
                        <span className='form__title'>{edit ? 'Edit' : 'View'}</span>
                        <label className='form__label'>
                            <span className='txt'>{lang === 'ru' ? 'Образовательное учреждение' : 'Educational institution'}</span>
                            <MySelect
                                className='inp'
                                disabled={!edit}
                                value={univer}
                                setValue={setUniver}
                            >
                                {
                                    universities?.map((i, num) => (
                                        <option value={i.id} key={num}>{ i.name }</option>
                                    ))
                                }
                            </MySelect>
                        </label>
                        <label className='form__label'>
                            <span className='txt'>{lang === 'ru' ? 'Факультет' : 'Faculty'}</span>
                            <MySelect
                                className='inp'
                                disabled={!edit}
                                value={program}
                                setValue={setProgram}
                            >
                                {
                                    programs?.map((i, num) => (
                                        <option value={i.id} key={num}>{ i.name }</option>
                                    ))
                                }
                            </MySelect>
                        </label>
                        <label className='form__label'>
                            <span className='txt'>{lang === 'ru' ? 'Учебная программа' : 'Training program'}</span>
                            <MySelect
                                className='inp'
                                disabled={!edit}
                                setValue={setProgramName}
                            >
                                {
                                    programsActive?.programPrices?.map((i, num) => (
                                        <option value={i.id} key={num}>{ i.name }</option>
                                    ))
                                }
                            </MySelect>
                        </label>
                        <button className='btn' onClick={() => editItem(i.id)}>{lang === 'ru' ? 'Подтвердить' : 'Submit'}</button>
                    </div>
                    <div className="bg" onClick={() => {
                        setModal(false)
                        setEdit(false)
                    }}/>
                </div>
            }
            {
                del &&
                <div className='modal'>
                    <div className="form">
                        <span className="form__title">{lang === 'ru' ? 'Подтвердите' : 'Confirm'}</span>
                        <div className='btns'>
                            <button
                                onClick={() => setDel(false)}>{lang === 'ru' ? 'Нет' : 'No'}</button>
                            <button
                                onClick={() => delItem(i?.id)}
                                className='del'
                            >
                                {lang === 'ru' ? 'Да' : 'Yes'}
                            </button>
                        </div>
                    </div>
                    <div onClick={() => setDel(false)} className="bg"/>
                </div>
            }
        </li>
    )
}

export default TableItem

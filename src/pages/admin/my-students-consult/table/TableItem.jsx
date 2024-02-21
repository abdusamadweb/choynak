import React, {useRef, useState} from 'react'
import {lang} from "../../../../assets/scripts/global";
import $api from "../../../../api/apiConfig";
import {toast} from "react-hot-toast";

const TableItem = ({ i, num, setEffect }) => {


    const [modal, setModal] = useState(false)
    // const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)

    const univer = useRef()
    const faculty = useRef()
    const program = useRef()


    //edit
    // const editItem = (id) => {
    //     const formData = new FormData()
    //     formData.append('university.name', univer?.current?.value)
    //     formData.append('program.name', univer?.current?.value)
    //     formData.append('programName.name', univer?.current?.value)
    //
    //     $api
    //         .post(`/university-application/update/${id}`, formData, {
    //             headers: { Authorization: 'Bearer OuaeLM2a2OuPJqutOOS40kFSjqmKPd4cj5g5tj84' }
    //         })
    //         .then(() => {
    //             toast.success('Success!')
    //             setEffect(prev => !prev)
    //         })
    //         .catch(err => {
    //             toast.error(err?.response?.data?.message)
    //         })
    // }


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


    return (
        <li className='item grid' key={i.id}>
            <span className='txt'>{num + 1}</span>
            <span className='txt'>{i?.fullName}</span>
            <span className='txt'>{i?.university?.name}</span>
            <span className='txt'>{i?.programPrice?.name + ', ' + i?.program?.name}</span>
            <div className='txt btns d-flex align-center'>
                <button
                    onClick={() => setModal(true)}>{lang === 'ru' ? 'Смотреть' : 'View'}</button>
                {/*<button onClick={() => {*/}
                {/*    setModal(true)*/}
                {/*    setEdit(true)*/}
                {/*}}>{lang === 'ru' ? 'Изменить' : 'Change'}</button>*/}
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
                {/*<button onClick={() => {*/}
                {/*    setModal(true)*/}
                {/*    setEdit(true)*/}
                {/*}}>*/}
                {/*    <i className="fa-solid fa-pen"/>*/}
                {/*</button>*/}
                <button className='del' onClick={() => setDel(true)}>
                    <i className="fa-solid fa-trash-can"/>
                </button>
            </div>
            {
                modal &&
                <div className='modal'>
                    <form className='form'>
                        <span className='form__title'>{'View'}</span>
                        <label className='form__label'>
                            <span className='txt'>{lang === 'ru' ? 'ФИО СТУДЕНТА' : 'STUDENTS FULL NAME'}</span>
                            <input
                                className='inp'
                                type="text"
                                required={true}
                                placeholder='Type . . .'
                                disabled={true}
                                ref={univer}
                                defaultValue={i?.fullName}
                            />
                        </label>
                        <label className='form__label'>
                            <span className='txt'>{lang === 'ru' ? 'НАЗВАНИЕ ВУЗа:' : 'NAME OF THE UNIVERSITY:'}</span>
                            <input
                                className='inp'
                                type="text"
                                required={true}
                                placeholder='Type . . .'
                                disabled={true}
                                ref={univer}
                                defaultValue={i?.university?.name}
                            />
                        </label>
                        <label className='form__label'>
                            <span className='txt'>{lang === 'ru' ? 'ФАКУЛЬТЕТ, ПРОГРАММА ОБУЧЕНИЯ:' : 'FACULTY, TRAINING PROGRAM:'}</span>
                            <input
                                className='inp'
                                type="text"
                                required={true}
                                placeholder='Type . . .'
                                disabled={true}
                                ref={program}
                                defaultValue={i?.programPrice?.name + ', ' + i?.program?.name}
                            />
                        </label>
                    </form>
                    <div className="bg" onClick={() => setModal(false)}/>
                </div>
            }
            {
                del &&
                <div className='modal'>
                    <div className="form del">
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

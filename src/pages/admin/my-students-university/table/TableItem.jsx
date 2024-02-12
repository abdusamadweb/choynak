import React, {useState} from 'react'
import {lang} from "../../../../assets/scripts/global";
import $api from "../../../../api/apiConfig";
import {toast} from "react-hot-toast";

const TableItem = ({ i, num, setEffect }) => {


    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)


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


    // confirm
    const confirmItem = (id) => {
        const formData = new FormData()
        formData.append('fullName', i?.fullName)
        formData.append('phoneNumber', i?.phoneNumber)
        formData.append('email', i?.email)
        formData.append('university', i?.university?.id)

        formData.append('confirm', 'true')

        $api
            .post(`university-application/update/${id}`, formData, {
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
            <span className='txt'>{i?.programName?.name}</span>
            <div className='txt btns d-flex align-center'>
                {
                    i?.confirm === 'false' &&
                    <button className='check' onClick={() => setEdit(true)}>
                        {lang === 'ru' ? 'Принять' : 'Confirm'}
                    </button>
                }
                <button
                    className='del'
                    onClick={() => setDel(true)}
                >
                    {lang === 'ru' ? 'Удалить' : 'Delete'}
                </button>
            </div>
            <div className='txt btns btns2 d-flex align-center'>
                {
                    i?.confirm === 'false' &&
                    <button className='check' onClick={() => setEdit(true)}>
                        <i className="fa-solid fa-check"/>
                    </button>
                }
                <button className='del' onClick={() => setDel(true)}>
                    <i className="fa-solid fa-trash-can"/>
                </button>
            </div>
            {
                edit &&
                <div className='modal'>
                    <div className='form'>
                        <span className="form__title">{lang === 'ru' ? 'Подтвердите' : 'Confirm'}</span>
                        <div className='btns'>
                            <button
                                onClick={() => setEdit(false)}>{lang === 'ru' ? 'Нет' : 'No'}</button>
                            <button
                                onClick={() => confirmItem(i?.id)}
                                className='check'
                            >
                                {lang === 'ru' ? 'Да' : 'Yes'}
                            </button>
                        </div>
                    </div>
                    <div className="bg" onClick={() => setEdit(false)}/>
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

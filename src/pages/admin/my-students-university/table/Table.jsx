import React from 'react'
import {lang} from "../../../../assets/scripts/global";
import TableItem from "./TableItem";

const Table = ({title, list, setEffect}) => {


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
            </div>
        </div>
    )
}

export default Table

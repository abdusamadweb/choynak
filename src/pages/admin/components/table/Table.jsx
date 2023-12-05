import './Table.scss'
import React, {useRef, useState} from 'react'
import {lang} from "../../../../assets/scripts/global";
import $api from "../../../../api/apiConfig";
import {toast} from "react-hot-toast";
import TableItem from "./TableItem";

const Table = ({title, list, setEffect}) => {


    return (
        <div className='table'>
            <div className='table__title'>{title}</div>
            <div className="body">
                <div className="body__txts grid">
                    <span className='txt'>№</span>
                    <span
                        className='txt'>{lang === 'ru' ? 'Образовательное учреждение' : 'Educational institution'}</span>
                    <span className='txt'>{lang === 'ru' ? 'Факультет' : 'Faculty'}</span>
                    <span className='txt'>{lang === 'ru' ? 'Учебная программа' : 'Training program'}</span>
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

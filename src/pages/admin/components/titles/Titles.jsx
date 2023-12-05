import './Titles.scss'
import React from 'react'

const Titles = ({ title }) => {
    return (
        <div className='admin-titles'>
            <div className="container">
                <span className="title">{ title }</span>
                <div className='icons'>
                    <i className="fa-solid fa-house"/>
                    <span>/ { title }</span>
                </div>
            </div>
        </div>
    )
}

export default Titles

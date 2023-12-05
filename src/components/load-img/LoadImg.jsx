import './LoadImg.scss'
import React from 'react'

const LoadImg = ({ url, className, value, setValue }) => {
    return url ?
        <img
            className={`img ${className ? className : ''}`}
            src={url}
            alt="img"
            onClick={() => setValue(value)}
        />
        : <div className={`load-img img ${className ? className : ''}`}/>
}

export default LoadImg

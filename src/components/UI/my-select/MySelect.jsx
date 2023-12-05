import './MySelect.scss'
import React from 'react'

const MySelect = ({ value, setValue, disabled, className, children }) => {
    return (
        <>
            <label className="select" htmlFor="slct">
                <select
                    id="slct"
                    className={className}
                    required={true}
                    disabled={disabled}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                >
                    {children}
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
        </>
    )
}

export default MySelect

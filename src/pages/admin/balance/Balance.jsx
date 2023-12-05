import React from 'react'
import CDashboard from "../components/dashboard/CDashboard";
import Titles from "../components/titles/Titles";
import {lang, me} from "../../../assets/scripts/global";

const Balance = () => {
    return (
        <div className='balance admin-page'>
            <Titles title={lang === 'ru' ? 'Баланс' : 'Balance'} />
            <CDashboard
                balance={true}
                title2={lang === 'ru' ? 'Ваш баланс' : 'Your balance'}
                count2={me?.balance || 0}
            />
        </div>
    )
}

export default Balance

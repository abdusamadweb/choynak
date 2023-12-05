import './FConsults.scss'
import React from 'react'
import Benefit from "../../components/benefit/Benefit";
import Faq from "../../components/faq/Faq";
import Registre from "./registre/Registre";
import {lang} from "../../assets/scripts/global";

const FConsults = () => {
    return (
        <div className='fConsults'>
            <Benefit />
            <Registre
                univer={false}
                title={lang === 'ru' ? 'Регистрационная форма консультанта' : 'Consult registration form'}
                inpTitle={lang === 'ru' ? 'О омпании' : 'About company'}
                inpPlaceholder={'Company name:'}
            />
            <Faq />
        </div>
    )
}

export default FConsults
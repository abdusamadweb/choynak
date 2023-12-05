import React from 'react'
import Benefit from "../../components/benefit/Benefit";
import Registre from "../for-consults/registre/Registre";
import {lang} from "../../assets/scripts/global";
import Faq from "../../components/faq/Faq";

const FUniversities = () => {
    return (
        <div className='fConsults'>
            <Benefit role='university' />
            <Registre
                univer={true}
                title={lang === 'ru' ? 'Регистрационная форма университета' : 'University registration form'}
                inpTitle={lang === 'ru' ? 'О ниверситете' : 'About university'}
                inpPlaceholder={'University name:'}
            />
            <Faq />
        </div>
    )
}

export default FUniversities

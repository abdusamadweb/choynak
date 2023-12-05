import './FStudents.scss'
import React from 'react'
import Calculator from "./calculator/Calculator";
import StudentUniversities from "../../components/universities/StudentUniversities";
import Registre from "./registre/Registre";
import Faq from "../../components/faq/Faq";
import Benefit from "../../components/benefit/Benefit";
import LoadImg from "../../components/load-img/LoadImg";

const FStudents = () => {
    return (
        <div className='fstudents'>
            <Benefit />
            <Calculator />
            <StudentUniversities />
            <Registre />
            <Faq />
        </div>
    )
}

export default FStudents

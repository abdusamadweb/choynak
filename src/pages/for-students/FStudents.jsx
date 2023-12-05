import './FStudents.scss'
import React from 'react'
import Calculator from "./calculator/Calculator";
import StudentUniversities from "../../components/universities/StudentUniversities";
import Registre from "./registre/Registre";
import Faq from "../../components/faq/Faq";
import Benefit from "../../components/benefit/Benefit";

const FStudents = () => {
    return (
        <div className='fstudents'>
            <Benefit role='student' />
            <Calculator />
            <StudentUniversities />
            <Registre />
            <Faq />
        </div>
    )
}

export default FStudents

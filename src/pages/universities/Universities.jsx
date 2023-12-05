import './Universities.scss'
import React from 'react'
import {Link} from "react-router-dom";
import StudentUniversities from "../../components/universities/StudentUniversities";
import {lang} from "../../assets/scripts/global";
import LangText from "../../components/lang/LangText";

const Universities = () => {
    return (
        <div className='universities'>
            <div className="container">
                <div className="universities__titles">
                    <h2 className="title">
                        <LangText txt={'Oxford?, Cambridge? maybe the University Massachusetts?'} />
                    </h2>
                    <p className="desc">
                        <LangText txt={'Is it difficult to choose? We\'ll help you. Leave a request soon!'} />
                    </p>
                    <Link className='btn' to='/for-students#form'>
                        {
                            lang === 'ru' ? 'Подать заявку' : 'Submit application'
                        }
                    </Link>
                </div>
            </div>
            <StudentUniversities />
        </div>
    )
}

export default Universities

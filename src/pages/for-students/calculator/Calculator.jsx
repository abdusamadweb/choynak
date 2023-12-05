import React, {useEffect, useState} from 'react'
import {lang} from "../../../assets/scripts/global";
import LangText from "../../../components/lang/LangText";
import MySelect from "../../../components/UI/my-select/MySelect";

const Calculator = () => {


    const [calc, setCalc] = useState(0)
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState(30)
    const [scholarship, setScholarship] = useState(50)
    const [course, setCourse] = useState(20)
    const [city, setCity] = useState(50)

    useEffect(() => {
        setAge(+age >= 14 && +age <= 22 ? 90 : (+age > 22 ? +age : 30))
        setCalc((+(age) + +(gender) + +(scholarship) + +(course) + +(city)) / 6)
    }, [age, gender, scholarship, course, city])


    return (
        <div className='calculator'>
            <div className="container">
                <div className="calculator__inner d-flex between align-center g2">
                    <div className="calculator__titles">
                        <span className='sub'>{ lang === 'ru' ? 'VISA Калькулятор' : 'VISA CALCULATOR!' }</span>
                        <h2 className="title">
                            <LangText txt={'Enter Your Details And Check Your Availability'} />
                        </h2>
                    </div>
                    <div className="form">
                        <input
                            className='form__inp inp'
                            type="number"
                                placeholder={ lang === 'ru' ? 'По возрасту' : 'By age' }
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <MySelect className='form__inp' setValue={setGender}>
                            <option value="30">{ lang === 'ru' ? 'Парень' : 'Man' }</option>
                            <option value="70">{ lang === 'ru' ? 'Девушка' : 'Woman' }</option>
                        </MySelect>
                        <MySelect className='form__inp' setValue={setScholarship}>
                            <option value="50">{ lang === 'ru' ? 'Ученость' : 'Scholarship' } 0%-50%</option>
                            <option value="100">{ lang === 'ru' ? 'Ученость' : 'Scholarship' } 50%-100%</option>
                        </MySelect>
                        <MySelect className='form__inp' setValue={setCourse}>
                            <option value="20">{ lang === 'ru' ? 'Подготовительный курс' : 'Preparatory course' }</option>
                            <option value="80">{ lang === 'ru' ? 'Другой' : 'Other' }</option>
                        </MySelect>
                        <MySelect className='form__inp' setValue={setCity}>
                            <option value="50">{ lang === 'ru' ? 'Центр города' : 'City center' }</option>
                            <option value="80">{ lang === 'ru' ? 'Из города' : 'Out of the city' }</option>
                        </MySelect>
                        <span className='form__result'>{ calc?.toFixed(1) }%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator

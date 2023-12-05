import React, {useState} from 'react'
import {lang} from "../../assets/scripts/global";

const FaqItem = ({ i, num }) => {

    const [active, setActive] = useState(false)


    return (
        <li
            className={`item d-flex between no-copy ${active ? 'active' : ''}`}
            onClick={() => setActive(!active)}
        >
            <div>
                <h3 className="item__title">{ num+1 }. { lang === 'ru' ? i.question.savolRu : i.question.savol }</h3>
                <p className="item__desc">{ lang === 'ru' ? i.javobRu : i.answer }</p>
            </div>
            <i className="fa-solid fa-arrow-up-long icon"/>
        </li>
    )
}

export default FaqItem

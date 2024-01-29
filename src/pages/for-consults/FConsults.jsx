import './FConsults.scss'
import React from 'react'
import Benefit from "../../components/benefit/Benefit";
import Faq from "../../components/faq/Faq";
import Registre from "./registre/Registre";
import {lang} from "../../assets/scripts/global";

const FConsults = () => {
    return (
        <div className='fConsults'>
            <Benefit role='consult' />
            <Registre
                univer={false}
                title={lang === 'ru' ? 'Регистрационная форма консультанта' : 'Consult registration form'}
                inpTitle={lang === 'ru' ? 'О омпании' : 'About company'}
                inpPlaceholder={'Company name:'}
            />
            <Faq />
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="align-self-center">
                            <div className="section-heading">
                                <h4 className="title">Миссия</h4>
                                <h4 className="text">Улучшение уровня жизни путем бесперебойной электрификации</h4>
                            </div>
                            <div
                                className="images-container"
                                style={{position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem'}}
                            >
                                <div className="light-images">
                                    <img style={{ width: '100%', height: 'auto' }}
                                         src="https://powergroup.uz/assets/front/file/2024-01-04_15-00-10.png"
                                         alt="Light Image" />
                                </div>
                                <img
                                    className='arrow'
                                    style={{position: 'absolute', inset: '50% 0 0 50%', transform: 'translate(-50%, -50%)', width: '33px', height: 'auto'}}
                                    src="https://clipart-library.com/images_k/black-arrow-transparent/black-arrow-transparent-13.png"
                                    alt="icon"
                                />
                                <div className="right-images">
                                    <img style={{ width: '100%', height: 'auto' }}
                                         src="https://powergroup.uz/assets/front/file/photo_2024-01-03_21-00-33.jpg"
                                         alt="Right Image" />
                                </div>
                            </div>
                            <div className="section-heading">
                                <p><strong>Боль</strong></p>
                                <p className="text">
                                    • Недостаток электроэнергии во всех сферах Узбекистана.
                                </p>
                                <p>• Последствия:</p>
                                <p>• Наше население вынуждено жить в жарких условиях - летом, в холодных условиях -
                                    зимой.<br />
                                    • Снижение производительности частных предприятий <br />
                                    • Наблюдение проблем в детских садах, школах, больницах.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default FConsults
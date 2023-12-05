import './Footer.scss'
import React, {useEffect, useState} from 'react';
import {Link, useHref} from "react-router-dom"
import {formatPhone, lang} from "../../assets/scripts/global"
import logo from '../../assets/images/logo.png'
import $api from "../../api/apiConfig";

const Footer = ({ general }) => {


    const href = useHref()


    // get countries
    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get('/countries')
            .then(res => setResult(res.data))
    }, [])


    // social media
    const [social, setSocial] = useState([])
    useEffect(() => {
        $api
            .get('/networking')
            .then(res => setSocial(res.data[0]))
    }, [])


    return (
        <div className={`footer ${href.includes('admin') && 'd-none'}`}>
            <div className="container">
                <div className="footer__inner">
                    <Link className='footer__logo' to='/'>
                        <img className='img' src={general?.logo?.full_url || logo} alt="logo"/>
                    </Link>
                    <address className='footer__address'>
                        {
                            lang === 'ru' ? general?.addressEn : general?.addressRu
                        }
                    </address>
                    <div>
                        <span className='nav__txt'>{ lang === 'ru' ? 'Учиться за границей:' : 'Study abroad:' }</span>
                        <ul className='nav__list'>
                            {
                                result?.slice(0, 5)?.map(i => (
                                    <li className="item">
                                        <Link className='link' to={`/countries/${i.name}`} key={i.id}>
                                            { lang === 'ru' ? 'Учиться в ' : 'Study in ' }
                                            { i.name }
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <span className='nav__txt'>{ lang === 'ru' ? 'Поддержка:' : 'Support:' }</span>
                        <ul className='nav__list'>
                            <li className="item">
                                <Link className='link' to='/working-conditions'>{ lang === 'ru' ? 'Условия труда' : 'Working conditions' }</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='socials'>
                    <div/>
                    <div>
                        <a className='tel' href={`tel: ${general?.phoneNumber}`}>{ formatPhone(general?.phoneNumber || '+998') }</a>
                        <a className='mail' href={`mailto: ${general?.email}`}>{ general?.email }</a>
                        <address className='footer__address address2'>
                            {
                                lang === 'ru' ? general?.addressEn : general?.addressRu
                            }
                            <i className="fa-solid fa-location-dot icon"/>
                        </address>
                        <div className='row align-center g1'>
                            {
                                social?.instagram &&
                                <a className='icon' href={social?.instagram} target='_blank'>
                                    <i className="fa-brands fa-instagram"/>
                                </a>
                            }
                            {
                                social?.facebook &&
                                <a className='icon' href={social?.facebook} target='_blank'>
                                    <i className="fa-brands fa-facebook"/>
                                </a>
                            }
                            {
                                social?.telegram &&
                                <a className='icon' href={social?.telegram} target='_blank'>
                                    <i className="fa-brands fa-telegram"/>
                                </a>
                            }
                            {
                                social?.youtube &&
                                <a className='icon' href={social?.youtube} target='_blank'>
                                    <i className="fa-brands fa-youtube"/>
                                </a>
                            }
                            {
                                social?.twitter &&
                                <a className='icon' href={social?.twitter} target='_blank'>
                                    <i className="fa-brands fa-x-twitter"/>
                                </a>
                            }
                        </div>
                    </div>
                </div>
                <div className='row around'>
                    <div/>
                    <div className="footer__rights2">{ general?.footerTxt || '...' }</div>
                </div>
                <div className="footer__rights">{ general?.footerTxt || '...' }</div>
            </div>
        </div>
    );
};

export default Footer;

import './Registre.scss'
import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {lang} from "../../../assets/scripts/global";
import MySelect from "../../../components/UI/my-select/MySelect";
import $api from "../../../api/apiConfig";
import {toast} from "react-hot-toast";
import {postAttachment} from "../../../api/apiResp";

const Registre = () => {


    // scroll
    const location = useLocation()
    useEffect(() => {
        const formElement = document.getElementById('form')
        if (location.hash === '#form') {
            formElement.scrollIntoView({ behavior: 'smooth' })
        }
    }, [location])


    // form
    const [fName, setFName] = useState('')
    const [sName, setSName] = useState('')
    const [password, setPassword] = useState('')
    const [date, setDate] = useState('')

    const [passportSerie, setPassportSerie] = useState('')
    const [passportNumber, setPassportNumber] = useState('')
    const [passportFile, setPassportFile] = useState(null)
    const [passportFileName, setPassportFileName] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')

    const [education, setEducation] = useState('')
    const [yearGraduation, setYearGraduation] = useState('')
    const [educationFile, setEducationFile] = useState(null)
    const [educationFileName, setEducationFileName] = useState('')

    const [langCert, setLangCert] = useState('')
    const [levelCert, setLevelCert] = useState('')
    const [yearCert, setYearCert] = useState('')
    const [fileCert, setFileCert] = useState(null)
    const [fileCertName, setFileCertName] = useState('')

    const [photo, setPhoto] = useState(null)
    const [photoName, setPhotoName] = useState('')
    const [cv, setCv] = useState(null)
    const [cvName, setCvName] = useState('')
    const [otherDocs, setOtherDocs] = useState(null)
    const [otherDocsName, setOtherDocsName] = useState('')

    const [sFullName, setSFullName] = useState('')
    const [sKinship, setSKinship] = useState('')
    const [sPhoneNumber, setSPhoneNumber] = useState('')


    const postFormData = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('firstName', fName)
        formData.append('secondName', sName)
        formData.append('password', password)
        formData.append('birthDate', date)

        formData.append('passportSerie', passportSerie)
        formData.append('passportNumber', passportNumber)
        formData.append('passportFile', passportFile?.full_url)

        formData.append('phoneNumber', phoneNumber)
        formData.append('email', email)
        formData.append('country', country)
        formData.append('city', city)
        formData.append('street', street)

        formData.append('education', education)
        formData.append('yearGraduation', yearGraduation)
        formData.append('educationFile', educationFile?.full_url)

        formData.append('languageCert', langCert)
        formData.append('levelCert', levelCert)
        formData.append('yearCert', yearCert)
        formData.append('fileCert', fileCert?.full_url)

        formData.append('photo', photo?.full_url)
        formData.append('cv', cv?.full_url)
        formData.append('otherDocs', otherDocs?.full_url)

        formData.append('sponsorFullName', sFullName)
        formData.append('kinship', sKinship)
        formData.append('sponsorPhoneNumber', sPhoneNumber)

        $api
            .post('application-for-student', formData, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer OuaeLM2a2OuPJqutOOS40kFSjqmKPd4cj5g5tj84'
                }
            })
            .then(() => {
                toast.success(lang === 'ru' ? 'Ваша заявка принята!' : 'Your application has been accepted!')
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
            })


        // google sheets
        const formData2 = new FormData()
        formData2.append('FirstName', fName)
        formData2.append('LastName', sName)
        formData2.append('BirtDate', date)
        formData2.append('PhoneNumber', phoneNumber)
        formData2.append('Email', email)
        formData2.append('Country', country)
        formData2.append('City', city)
        formData2.append('Street', street)
        formData2.append('PassportSerie', passportSerie)
        formData2.append('PassportNumber', passportNumber)
        formData2.append('PassportFile', passportFile)
        formData2.append('Education', education)
        formData2.append('YearGraduation', yearGraduation)
        formData2.append('EducationFile', educationFile)
        formData2.append('LanguageCert', langCert)
        formData2.append('LevelCert', levelCert)
        formData2.append('YearCert', yearCert)
        formData2.append('FileCert', fileCert)
        formData2.append('Photo', photo)
        formData2.append('Cv', cv)
        formData2.append('OtherFiles', otherDocs)
        formData2.append('SponsorFullName', sFullName)
        formData2.append('Kinship', sKinship)
        formData2.append('SponsorPhoneNumber', sPhoneNumber)

        $api
            .post('https://script.google.com/macros/s/AKfycbzfrtcKnX9je5-XbXW4ziOoHHVE98y7NukY5d08Ir67PksVFiDn9R8grSr0WPAQggyWwQ/exec', formData2)
    }


    // files
    const sendPassportFile = async (files) => {
        const res = await postAttachment('/project-media/upload', files)
        setPassportFile(res)
        setPassportFileName(res?.file_name)
    }

    const sendEducationFile = async (files) => {
        const res = await postAttachment('/project-media/upload', files)
        setEducationFile(res)
        setEducationFileName(res?.file_name)
    }

    const sendFileCert = async (files) => {
        const res = await postAttachment('/project-media/upload', files)
        setFileCert(res)
        setFileCertName(res?.file_name)
    }

    const sendPhoto = async (files) => {
        const res = await postAttachment('/project-media/upload', files)
        setPhoto(res)
        setPhotoName(res?.file_name)
    }

    const sendCv = async (files) => {
        const res = await postAttachment('/project-media/upload', files)
        setCv(res)
        setCvName(res?.file_name)
    }

    const sendOtherDocs = async (files) => {
        const res = await postAttachment('/project-media/upload', files)
        setOtherDocs(res)
        setOtherDocsName(res?.file_name)
    }


    return (
        <section className='reg' id='form'>
            <div className="container">
                <h2 className="reg__title">{ lang === 'ru' ? 'Регистрационная форма студента' : 'Student registration form' }:</h2>
                <form className="form" onSubmit={postFormData}>
                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Личные данные' : 'Personal data' }:</span>
                        <div className='form__wrapper'>
                            <input
                                className='inp'
                                type="text"
                                placeholder='Second name:'
                                onChange={(e) => setFName(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="text"
                                placeholder='First name:'
                                onChange={(e) => setSName(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="password"
                                placeholder='Password:'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='inps'>
                                <input
                                    className='inp date'
                                    type="text"
                                    placeholder="Ex: 22.02.2002"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <i className="fa-solid fa-calendar-days"/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Пасспортные данные' : 'Passport data' }:</span>
                        <div className='form__wrapper'>
                            <input
                                className='inp'
                                type="text"
                                placeholder='Serie of passport:'
                                onChange={(e) => setPassportSerie(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="number"
                                placeholder='Numbers of passport:'
                                onChange={(e) => setPassportNumber(e.target.value)}
                            />
                            <label>
                                <input
                                    className='inp file'
                                    type="file"
                                    onChange={(e) => sendPassportFile(e.target.files)}
                                />
                                <span className='inp inp-file'>{ passportFileName || 'Upload a file (.jpg, .pdf up to 5 MB)' }</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Контактные данные' : 'Contact data' }:</span>
                        <div className=" form__wrapper">
                            <input
                                className='inp'
                                type="tel"
                                placeholder='Phone number:'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="email"
                                placeholder='Email:'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form__wrapper'>
                            <input
                                className='inp'
                                type="text"
                                placeholder='Country:'
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="text"
                                placeholder='City:'
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="text"
                                placeholder='Street:'
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Образование' : 'Education' }:</span>
                        <div className='form__wrapper'>
                            <MySelect className='inp' setValue={setEducation}>
                                <option value="">Select from list:</option>
                                <option value="formal">Formal</option>
                                <option value="informal">Informal</option>
                                <option value="non-formal">Non-formal</option>
                            </MySelect>
                            <input
                                className='inp'
                                type="text"
                                placeholder='Year of graduation:'
                                onChange={(e) => setYearGraduation(e.target.value)}
                            />
                            <label>
                                <input
                                    className='inp file'
                                    type="file"
                                    onChange={(e) => sendEducationFile(e.target.files)}
                                />
                                <span className='inp inp-file'>{ educationFileName || 'Upload a file (.jpg up to 5 MB)' }</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Языковые сертификаты' : 'Language Certificates' }:</span>
                        <div className='form__wrapper'>
                            <MySelect className='inp' setValue={setLangCert}>
                                <option value="">Type of certificate:</option>
                                <option value=" ielts">IELTS</option>
                                <option value=" sat">SAT</option>
                                <option value=" toefl">TOEFL</option>
                            </MySelect>
                            <div className='d-flex g1'>
                                <input
                                    className='inp'
                                    type="text"
                                    placeholder='Level:'
                                    onChange={(e) => setLevelCert(e.target.value)}
                                />
                                <input
                                    className='inp'
                                    type="text"
                                    placeholder='Year of receipt:'
                                    onChange={(e) => setYearCert(e.target.value)}
                                />
                            </div>
                            <label>
                                <input
                                    className='inp file'
                                    type="file"
                                    onChange={(e) => sendFileCert(e.target.files)}
                                />
                                <span className='inp inp-file'>{ fileCertName || 'Upload a file (.jpg, .pdf up to 5 MB)' }</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Другие данные' : 'Other data' }:</span>
                        <div className=" form__wrapper other">
                            <label>
                                <div>
                                    <input
                                        className='inp file'
                                        type="file"
                                        onChange={(e) => sendPhoto(e.target.files)}
                                    />
                                    <span className='inp inp-file'>{ photoName || 'Upload a file (.jpg up to 2 MB)' }</span>
                                </div>
                                <span className=" inp-txt">Your 3x4 photo on a white background</span>
                            </label>
                            <label>
                                <div>
                                    <input
                                        className='inp file'
                                        type="file"
                                        onChange={(e) => sendCv(e.target.files)}
                                    />
                                    <span className='inp inp-file'>{ cvName || 'Upload a file (.pdf up to 5 MB)' }</span>
                                </div>
                                <span className=" inp-txt">CV - Upload your resume</span>
                            </label>
                            <label>
                                <div>
                                    <input
                                        className='inp file'
                                        type="file"
                                        onChange={(e) => sendOtherDocs(e.target.files)}
                                    />
                                    <span className='inp inp-file'>{ otherDocsName || 'Upload a file (.zip up to 10 MB)' }</span>
                                </div>
                                <span className=" inp-txt">
                                    Other documents, Download all
                                    additional documents in one .zip the folder and upload it here</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <span className='txt'>{ lang === 'ru' ? 'Информация о спонсоре' : 'Sponsor information' }:</span>
                        <div className='form__wrapper'>
                            <input
                                className='inp'
                                type="text"
                                placeholder='Sponsors full name:'
                                onChange={(e) => setSFullName(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="text"
                                placeholder='Kinship:'
                                onChange={(e) => setSKinship(e.target.value)}
                            />
                            <input
                                className='inp'
                                type=" text"
                                placeholder='Sponsors phone number:'
                                onChange={(e) => setSPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className=" btn">{ lang === 'ru' ? 'Отправить запрос' : 'Send a request' }</button>
                </form>
            </div>
        </section>
    )
}

export default Registre

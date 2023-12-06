import './StudentForm.scss'
import React, {useState} from 'react'
import Titles from "../components/titles/Titles";
import {lang, me} from "../../../assets/scripts/global";
import $api from "../../../api/apiConfig";
import {postAttachment} from "../../../api/apiResp";
import {toast} from "react-hot-toast";

const StudentForm = ({ setEffect }) => {

    const [fName, setFName] = useState(me.firstName || '')
    const [sName, setSName] = useState(me.secondName || '')
    const [date, setDate] = useState(me.birthDate || '')

    const [passportSerie, setPassportSerie] = useState(me.passportSerie || '')
    const [passportNumber, setPassportNumber] = useState(me.passportNumber || '')
    const [passportFile, setPassportFile] = useState(me.passportFile || '')
    const [passportFileName, setPassportFileName] = useState(me.passportFile || '')

    const [phoneNumber, setPhoneNumber] = useState(me.phoneNumber || '')
    const [email, setEmail] = useState(me.email || '')
    const [country, setCountry] = useState(me.country || '')
    const [city, setCity] = useState(me.city || '')
    const [street, setStreet] = useState(me.street || '')

    const [education, setEducation] = useState(me.education || '')
    const [yearGraduation, setYearGraduation] = useState(me.yearGraduation || '')
    const [educationFile, setEducationFile] = useState(me.educationFile || '')
    const [educationFileName, setEducationFileName] = useState(me.educationFile || '')

    const [langCert, setLangCert] = useState(me.langCert || '')
    const [levelCert, setLevelCert] = useState(me.levelCert || '')
    const [yearCert, setYearCert] = useState(me.yearCert || '')
    const [fileCert, setFileCert] = useState(me.fileCert || '')
    const [fileCertName, setFileCertName] = useState(me.fileCert || '')

    const [sFullName, setSFullName] = useState(me?.sponsorFullName || '')
    const [sKinship, setSKinship] = useState(me?.kinship || '')
    const [sPhoneNumber, setSPhoneNumber] = useState(me?.sponsorPhoneNumber || '')

    const changeData = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('firstName', fName)
        formData.append('secondName', sName)
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

        formData.append('langCert', langCert)
        formData.append('levelCert', levelCert)
        formData.append('yearCert', yearCert)
        formData.append('fileCert', fileCert?.full_url)

        formData.append('photo', me?.photo)
        formData.append('cv', me?.cv)
        formData.append('otherDocs', me?.otherDocs)

        formData.append('sponsorFullName', sFullName)
        formData.append('kinship', sKinship)
        formData.append('sponsorPhoneNumber', sPhoneNumber)

        $api
            .post(`/application-for-student/update/${me?.id}`, formData, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer Tad216tIaccvhAKVAd5TYssnZqM63IUBVwNiHFUM'
                }
            })
            .then(() => {
                toast.success('Success!')
                setEffect(prev => !prev)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
                setEffect(prev => !prev)
            })
    }


    // files
    const sendPassportFile = async (files) => {
        const res = await postAttachment('/project-media/upload', files)
        setPassportFile(res)
        setPassportFileName(res?.file_name)
        console.log(passportFileName)
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

    // format url
    const extractFileName = (url) => {
        const match = url.match(/\/([^\/]+)$/)
        return match ? match[1] : ''
    }


    return (
        <div className='student-form'>
            <Titles title={lang === 'ru' ? 'Мои заявки' : 'My applications'}/>
            <div className="student-form__title">{lang === 'ru' ? 'Мои данные' : 'My details'}</div>
            <form className="form" onSubmit={changeData}>
                <input
                    className='inp'
                    type="text"
                    placeholder='Second name'
                    required={true}
                    value={sName}
                    onChange={(e) => setSName(e.target.value)}
                />
                <input
                    className='inp'
                    type="text"
                    placeholder='First name'
                    required={true}
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                />
                <input
                    className='inp'
                    type="text"
                    placeholder='Date'
                    required={true}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />


                <input
                    className='inp'
                    type="text"
                    placeholder='Passport serie'
                    required={true}
                    value={passportSerie}
                    onChange={(e) => setPassportSerie(e.target.value)}
                />
                <input
                    className='inp'
                    type="number"
                    placeholder='Passport number'
                    required={true}
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                />
                <label className='files'>
                    <input
                        className='inp file'
                        type="file"
                        filename={passportFile}
                        onChange={(e) => sendPassportFile(e.target.files)}
                    />
                    <span>{ extractFileName(passportFileName) || 'Select file' }</span>
                </label>

                <input
                    className='inp'
                    type="text"
                    placeholder='Phone number'
                    required={true}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    className='inp'
                    type="text"
                    placeholder='Email'
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div/>

                <input
                    className='inp'
                    type="text"
                    placeholder='Country'
                    required={true}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <input
                    className='inp'
                    type="text"
                    placeholder='City'
                    required={true}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    className='inp'
                    type="text"
                    placeholder='Street'
                    required={true}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />

                <input
                    className='inp'
                    type="text"
                    placeholder='Education'
                    required={true}
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                />
                <input
                    className='inp'
                    type="text"
                    placeholder='Year of graduation'
                    required={true}
                    value={yearGraduation}
                    onChange={(e) => setYearGraduation(e.target.value)}
                />
                <label className='files'>
                    <input
                        className='inp file'
                        type="file"
                        filename={educationFile}
                        onChange={(e) => sendEducationFile(e.target.files)}
                    />
                    <span>{ extractFileName(educationFileName) || 'Select file' }</span>
                </label>

                <input
                    className='inp'
                    type="text"
                    placeholder='Type of certificate'
                    required={true}
                    value={langCert}
                    onChange={(e) => setLangCert(e.target.value)}
                />
                <div className='d-flex g1'>
                    <input
                        className='inp'
                        type="text"
                        placeholder='Level'
                        required={true}
                        value={levelCert}
                        onChange={(e) => setLevelCert(e.target.value)}
                    />
                    <input
                        className='inp'
                        type="text"
                        placeholder='Year of receipt'
                        required={true}
                        value={yearCert}
                        onChange={(e) => setYearCert(e.target.value)}
                    />
                </div>
                <label className='files'>
                    <input
                        className='inp file'
                        type="file"
                        filename={fileCert}
                        onChange={(e) => sendFileCert(e.target.files)}
                    />
                    <span>{ extractFileName(fileCertName) || 'Select file' }</span>
                </label>

                <input
                    className='inp'
                    type="text"
                    placeholder='Sponsors full name'
                    required={true}
                    value={sFullName}
                    onChange={(e) => setSFullName(e.target.value)}
                />
                <input
                    className='inp'
                    type="text"
                    placeholder='Kinship'
                    required={true}
                    value={sKinship}
                    onChange={(e) => setSKinship(e.target.value)}
                />
                <input
                    className='inp'
                    type="tel"
                    placeholder='Sponsors phone number'
                    required={true}
                    value={sPhoneNumber}
                    onChange={(e) => setSPhoneNumber(e.target.value)}
                />

                <div/>
                <div/>
                <button className='btn'>{lang === 'ru' ? 'Изменить детали' : 'Change details'}</button>
            </form>
        </div>
    )
}

export default StudentForm

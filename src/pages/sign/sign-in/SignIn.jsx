import '../Sign.scss'
import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import $api from "../../../api/apiConfig";
import {toast} from "react-hot-toast";
import MySelect from "../../../components/UI/my-select/MySelect";

const SignIn = () => {


    const navigate = useNavigate()


    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')

    const logIn = (psw) => {
        const item = {
            phone: phoneNumber,
            password,
            role
        }
        if (psw === password) {
            toast.success('Success')

            localStorage.setItem('token', `${'###'}`)
            localStorage.setItem('userAdmin', JSON?.stringify({role, phoneNumber}))

            $api
                .get(`application-for-${role}?where[phoneNumber]=${encodeURIComponent(phoneNumber)}`, {
                    headers: {Auth: localStorage.getItem('token')}
                })
                .then(res => {
                    localStorage.setItem('me', JSON?.stringify(res.data?.[0]))

                    window.location.reload()
                })

            navigate('/admin')

            // $api
            //     .post('https://api.choynak.org/login.php', item)
            //     .then(res => {
            //         toast.success('Success')
            //
            //         localStorage.setItem('token', `${res.data.token}`)
            //         localStorage.setItem('userAdmin', JSON?.stringify({role, phoneNumber}))
            //
            //         console.log(res)
            //     })
            //     .catch(err => {
            //         toast.error(err?.response?.data?.message)
            //     })
        } else {
            toast.error('Password error!')
        }
    }
    const afterLogin = (e) => {
        e.preventDefault()

        $api
            .get(`application-for-${role}?where[phoneNumber]=${encodeURIComponent(phoneNumber)}`)
            .then(res => {
                logIn(res.data?.[0]?.password)
            })
    }


    return (
        <div className='sign'>
            <div className="container">
                <div className="sign__inner grid-center">
                    <div>
                        <div className="sign__title">Login</div>
                        <form className="sign__form" onSubmit={afterLogin}>
                            <label className='mb1'>
                                <span className='txt'>Phone number:</span>
                                <input
                                    className='inp'
                                    type="tel"
                                    placeholder='Phone number . . .'
                                    required={true}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </label>
                            <label className='mb1'>
                                <span className='txt'>Password:</span>
                                <input
                                    className='inp'
                                    type="password"
                                    placeholder='Password . . .'
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <label>
                                <span className='txt'>Select role:</span>
                                <MySelect className='inp' setValue={setRole}>
                                    <option value='student'>Student</option>
                                    <option value='consult'>Consult</option>
                                    <option value='university'>University</option>
                                </MySelect>
                            </label>
                            <button className='btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn

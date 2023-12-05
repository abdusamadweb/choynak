import '../Sign.scss'
import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import $api from "../../../api/apiConfig";
import {toast} from "react-hot-toast";

const SignUp = () => {


    const navigate = useNavigate()


    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const signUp = (e) => {
        e.preventDefault()

        if (password2 === password) {
            const item = {
                name: name,
                phone: phoneNumber,
                password,
                role: 'student'
            }
            $api
                .post('https://api.choynak.org/register.php', item)
                .then(res => {
                    toast.success('Success')

                    localStorage.setItem('token', `Bearer ${res.data.token}`)

                    $api
                        .get('https://api.choynak.org/me.php', {
                            headers: {Auth: localStorage.getItem('token')}
                        })
                        .then(res => {
                            localStorage.setItem('me', JSON?.stringify(res.data))

                            window.location.reload()
                        })
                        .catch(err => {
                            toast.error(err?.response?.data?.message)
                        })

                    navigate('/admin')
                })
                .catch(err => {
                    toast.error(err?.response?.data?.message)
                })
        } else {
            toast.error('Password error !')
        }
    }


    return (
        <div className='sign'>
            <div className="container">
                <div className="sign__inner grid-center">
                    <div>
                        <div className="sign__title">Student Register</div>
                        <form className="sign__form" onSubmit={signUp}>
                            <label className='mb1'>
                                <span className='txt'>Full name:</span>
                                <input
                                    className='inp'
                                    type="tel"
                                    placeholder='Full name . . .'
                                    required={true}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
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
                            <label className='mb1'>
                                <span className='txt'>Confirm password:</span>
                                <input
                                    className='inp'
                                    type="password"
                                    placeholder='Password . . .'
                                    required={true}
                                    onChange={(e) => setPassword2(e.target.value)}
                                />
                            </label>
                            <button className='btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp

import React, { useEffect, useState, useLayoutEffect} from 'react';
import { loginUser, logoutUser } from '../../Services/Auth.js'
import { useNavigate } from 'react-router-dom'
import { isLogged } from '../../Services/UserInfo.js';
import './Login.css'

function LoginForm() {
    const [detail, setDetail] = useState({
        email: "",
        password: "",
    });
    const [failed, Failed] = useState(0);
    const navigate = useNavigate();
    
    const submitHandler = async(e) => {
        e.preventDefault();
        await loginUser(detail);
        if (await isLogged())
            navigate('/home')
    };

    useEffect(() => {
        const goHomeIfLogged = async() => {
            if (await isLogged())
                navigate('/home')
        }
        goHomeIfLogged();
    })

    return (
        <form className='login-form' onSubmit={submitHandler}>
            <input type='email' placeholder='Email' onChange = {e => setDetail({...detail, email: e.target.value})} value={detail.email} />
            <input type='password' placeholder='Password' onChange = {e => setDetail({...detail, password: e.target.value})} value={detail.password} />
            <button>Login</button>

            {failed ? <p className='failedLog'> Email or password is incorrect!  </p> : null}
            <p className='message'>Not registered? <a href='/register'>Create an account</a></p>
        </form>
    );
}

function Login() {
    return(
        <div className='login-page'>
            <div className='form'>
                <LoginForm />
            </div>
        </div>
    );
}
export default Login
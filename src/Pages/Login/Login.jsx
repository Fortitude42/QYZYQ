import React, { useEffect, useState } from 'react';
import './Login.css'
import {loginUser} from '../../services/auth.js'
import {useNavigate} from 'react-router-dom'

function LoginForm() {
    const [detail, setDetail] = useState({
        email: "",
        password: "",
    });
    const [failed, Failed] = useState(0);
    const navigate = useNavigate();
    
    const submitHandler = e => {
        e.preventDefault();
        loginUser(detail);
    };

    useEffect(() => {
        fetch("http://localhost:5000/users/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? navigate("/home") : null);  
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
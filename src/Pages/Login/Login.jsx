import React, { useEffect, useState } from 'react';
import { loginUser, logoutUser } from '../../Services/Auth.js'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../Services/UserInfo.js';
import './Login.css'

function LoginForm() {
    const [detail, setDetail] = useState({
        email: "",
        password: "",
    });
    const [failed, setFailed] = useState(0);
    const navigate = useNavigate();

    const goToUserPageIfLoggedIn = async() => {
        const currentUser = await getCurrentUser();
        if (currentUser.isLoggedIn) {            
            navigate('/users/'+currentUser.id);
            window.location.reload();
        }
    }
    
    const submitHandler = async(e) => {
        e.preventDefault();
        await loginUser(detail);
        goToUserPageIfLoggedIn();
        setFailed(1);
    };

    useEffect(() => {        
        goToUserPageIfLoggedIn();
    })

    return (
        <form className='position-relative' onSubmit={submitHandler}>
            <input type='email' placeholder='Email' onChange = {e => setDetail({...detail, email: e.target.value})} value={detail.email} />
            <input type='password' placeholder='Password' onChange = {e => setDetail({...detail, password: e.target.value})} value={detail.password} />
            <button>Login</button>

            {failed ? <p className='text-danger position-absolute ms-4'> Email or password is incorrect!  </p> : null}
            <p className='message mt-4'>Not registered? <a href='/register'>Create an account</a></p>
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
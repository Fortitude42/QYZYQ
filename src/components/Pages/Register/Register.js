import React, { useState } from 'react';
import './Register.css'


function RegisterForm() {
    const [password_confirmed, toConfirm] = useState(1);
    const [detail, setDetail] = useState({
        name: "",
        email: "",
        password: "",
        password_confirm: "",
    });
    
    const submitHandler = e => {
        e.preventDefault();
        if(detail.password != detail.password_confirm)
            toConfirm(0);
    };
      
    return (
        <form className='login-form' onSubmit={submitHandler}>
            <input type='text' placeholder='Name' onChange = {e => setDetail({...detail, name: e.target.value})} value={detail.name} />
            <input type='email' placeholder='Email' onChange = {e => setDetail({...detail, email: e.target.value})} value={detail.email} />
            <input type='password' placeholder='Password' onChange = {e => setDetail({...detail, password: e.target.value})} value={detail.password} />
            <input type='password' placeholder='Password Confirmation' onChange = {e => setDetail({...detail, password_confirm: e.target.value})} value={detail.password_confirm} />
            <button>Register</button>
            {password_confirmed === 0 ? <p className='failedReg'> Passwords does not match </p> : null}
            <p className='message'>Alredy Registrated? <a href='#'>Sign in</a></p>
        </form>
    );
}

function Register() {
    return(
        <div className='login-page'>
            <div className='form'>
                <RegisterForm />
            </div>
        </div>
    );
}
export default Register
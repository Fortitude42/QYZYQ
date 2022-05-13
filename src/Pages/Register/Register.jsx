import React, { useEffect, useState } from 'react';
import './Register.css'
import {registerUser} from '../../services/auth.js'
import {useNavigate} from 'react-router-dom'


function RegisterForm() {
    const [detail, setDetail] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirm: "",
    });

    const navigate = useNavigate();

    function isVaild(detail){
        if(detail.first_name.length == 0)
            return false;
        
        if(detail.password != detail.password_confirm)
            return false;
            
        if(detail.password.length < 6)
            return false;
            
        return true;
    }
    
    const submitHandler = e => {
        e.preventDefault();
        if (!isVaild(detail))
            return;
        registerUser(detail);
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
            <input type='text' placeholder='First name' onChange = {e => setDetail({...detail, first_name: e.target.value})} value={detail.first_name} />
            <input type='text' placeholder='Last name' onChange = {e => setDetail({...detail, last_name: e.target.value})} value={detail.last_name} />
            <input type='email' placeholder='Email' onChange = {e => setDetail({...detail, email: e.target.value})} value={detail.email} />
            <input type='password' placeholder='Password' onChange = {e => setDetail({...detail, password: e.target.value})} value={detail.password} />
            <input type='password' placeholder='Password Confirmation' onChange = {e => setDetail({...detail, password_confirm: e.target.value})} value={detail.password_confirm} />
            <button>Register</button>
            <p className='message'>Alredy Registrated? <a href='/login'>Sign in</a></p>
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
import React, { useState } from 'react';
import axios from "axios";
import './Register.css'


function RegisterForm() {    
    const [detail, setDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    function isVaild(detail){
        if(detail.first_name.length === 0)
            return false;
        
        if(detail.password !== detail.password_confirm)
            return false;
            
        if(detail.password.length < 6)
            return false;
            
        return true;
    }
    
    const submitHandler = e => {
        e.preventDefault();
        if (!isVaild(detail))
            return;
        
        axios.post('http://localhost:5000/users/add', {
            firstname: detail.firstName,
            lastname: detail.lastName,
            email: detail.email,
            password: detail.password
        }).then(response => {
            console.log(response.data);
        })
        .catch((error) => console.log(error));
    };
      
    return (
        <form className='login-form' onSubmit={submitHandler}>
            <input type='text' placeholder='First name' onChange = {e => setDetail({...detail, firstName: e.target.value})} value={detail.firstName} />
            <input type='text' placeholder='Last name' onChange = {e => setDetail({...detail, lastName: e.target.value})} value={detail.lastName} />
            <input type='email' placeholder='Email' onChange = {e => setDetail({...detail, email: e.target.value})} value={detail.email} />
            <input type='password' placeholder='Password' onChange = {e => setDetail({...detail, password: e.target.value})} value={detail.password} />
            <input type='password' placeholder='Password Confirmation' onChange = {e => setDetail({...detail, passwordConfirm: e.target.value})} value={detail.passwordConfirm} />
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
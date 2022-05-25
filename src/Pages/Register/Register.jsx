import { loginUser, registerUser } from '../../Services/Auth.js'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../Services/UserService.js';
import React, { useEffect, useState } from 'react';
import './Register.css';


function RegisterForm() {    
    const [detail, setDetail] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const navigate = useNavigate();

    function isVaild(detail){
        if(detail.firstName.length === 0)
            return false;
        
        if(detail.password !== detail.passwordConfirm)
            return false;
            
        if(detail.password.length < 6)
            return false;
            
        return true;
    }
    
    const submitHandler = e => {
        e.preventDefault();
        if (!isVaild(detail))
            return;
        registerUser(detail)
        .then(res => {
            if(res.data == "User added"){
                loginUser(detail);
                navigate("/");
            }
        })
    };

    const goToUserPageIfLoggedIn = async() => {
        const currentUser = await getCurrentUser();
        if (currentUser.isLoggedIn) {             
            navigate('/users/'+currentUser.id);
            window.location.reload();
        }
    }

    useEffect(() => {        
        goToUserPageIfLoggedIn();
    })
      
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
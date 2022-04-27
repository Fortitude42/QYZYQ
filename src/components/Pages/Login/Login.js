import React, { useState } from 'react';
import './Login.css'


function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failed, Failed] = useState(0);
    
    const submitHandler = e => {
        e.preventDefault();
        if(email.length > 0 && password.length > 0)
            Failed(1);
    };
      
    return (
        <form className='login-form' onSubmit={submitHandler}>
            <input type='email' placeholder='Email' onChange = {e => setEmail(e.target.value)} value={email} />
            <input type='password' placeholder='Password' onChange = {e => {setPassword(e.target.value)}} value={password} />
            <button>Login</button>

            {failed ? <p className='failedLog'> Email or password is incorrect!  </p> : null}
            <p className='message'>Not registered? <a href='#'>Create an account</a></p>
        </form>
    );
}

function Login(user, password) {
    return(
        <div className='login-page'>
            <div className='form'>
                <LoginForm />
            </div>
        </div>
    );
}
export default Login
import React, { useState } from 'react'
import './Register.css'
import axios from "axios"

function Register() {
    const [userInfo, setUserInfo] = useState({
      username : '',
      email : '',
      password : ''
    });
    

    const handleChange = (e) => {
      setUserInfo({
        ...userInfo, [e.target.name] : e.target.value
      });
    };
    const handleRegister = () => {

      axios.post('http://localhost:5000/register', userInfo, {withCredentials: true})
      .then((res) =>{
        window.location.href = '/login';
      })
      
    }
  return (
    <div>
      <div className='bg'></div>
      <div className="box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
        <div className="input">
            <input type="text" placeholder="Username .." name ='username' onChange={(e) =>{handleChange(e)}} />
            <label>Username</label>
          </div>
          <div className="input">
            <input type="email" placeholder="Email .." name ='email' onChange={(e) =>{handleChange(e)}} />
            <label>Email</label>
          </div>
          <div className="input">
            <input type="password" placeholder="Password .." name = 'password' onChange={(e) =>{handleChange(e)}}/>
            <label>Password</label>
          </div>
          <input type="submit" name="sign-up" value='Register'/>
          <div className='signin'>
            <h4>You have an account ? : </h4>
            <a href='/login'>Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

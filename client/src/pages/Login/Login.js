import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux' 
import { setLoginStatus, setUsername } from 'redux/UserSlice';
import './Login.css'

function Login() {
  const dispatch = useDispatch()
  const [userLog, setUserLog] = useState({
    email : '',
    password : ''
  })
  const handleChange = (e) => {  
    setUserLog({
      ...userLog, [e.target.name] : e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', userLog, {withCredentials: true})
    .then(res => {
      dispatch(setUsername({username : res.data.info[0].username}))
      dispatch(setLoginStatus(true))
      window.location.href = '/lobby';
    }).catch(err => console.log(err))
  }

  return (
    <div>
      <div className='bg'></div>
      <div className="box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input type="email" placeholder="Email .." name ='email' onChange={(e) =>{handleChange(e)}} />
            <label>Email</label>
          </div>
          <div className="input">
            <input type="password" placeholder="Password .." name = 'password' onChange={(e) =>{handleChange(e)}}/>
            <label>Password</label>
          </div>
          <input type="submit" name="sign-in" value='login'/>
          <div className='signup'>
            <h4>Create account </h4>
            <a href='/register'>Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

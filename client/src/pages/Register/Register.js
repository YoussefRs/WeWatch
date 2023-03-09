import React, { useState } from 'react'
import './Register.css'
import axios from "axios"

function Register() {
    const [userInfo, setUserInfo] = useState({
      username : '',
      email : '',
      password : ''
    });

    const [file, setFile] = useState('')
    
    const setImgFile= (e) => {
      setFile(e.target.files[0])
    }

    const handleChange = (e) => {
      setUserInfo({
        ...userInfo, [e.target.name] : e.target.value
      });
    };
    const handleRegister = () => {
      const formData = new FormData();
      formData.append('username', userInfo.username);
      formData.append('email', userInfo.email);
      formData.append('password', userInfo.password);
      formData.append('pic', file);
    
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
        }
      }
    
      axios.post('http://localhost:5000/register', formData, { withCredentials: true })
        .then((res) => {
          window.location.href = '/login';
        })
        .catch((err) => {
          console.error(err);
        });
    }
  return (
    <div>
      <div className='bg'></div>
      <div className="box">
        <h2>Register</h2>
        <form onSubmit={handleRegister} encType="multipart/form-data">
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
          {/* <div className="input">
            <input type="file" name = 'file' onChange={setImgFile} />
            <label>Profile Pic</label>
          </div> */}
          <input type="submit" name="sign-up" value='Register'/>
          <div className='signin'>
            <h4>got account? :</h4>
            <a href='/login'>Sign in</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

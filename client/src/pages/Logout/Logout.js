import axios from 'axios'
import React from 'react'
import './Logout.css'
import { useDispatch } from 'react-redux'
import { setLoginStatus, setUsername, setUserUrlPic } from 'redux/UserSlice'

function Logout() {
  const dispatch = useDispatch()
  

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/logout').then(res => {
      dispatch(setLoginStatus(false));
      dispatch(setUsername({username : ""}))
      dispatch(setUserUrlPic(""))
    })
    
  }
  return (
      <button onClick={handleLogout}>logout</button>
  )
}

export default Logout

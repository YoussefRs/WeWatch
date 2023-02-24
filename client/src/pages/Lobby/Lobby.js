import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux' 

import { Link } from "react-router-dom"; 

import './Lobby.css'  

function Lobby(props) { 

    const username = useSelector((state) => state.user.username)
    const [roomName, setRoomName] = useState('')  

    const roomNameChangeHandler = e => {
        setRoomName(e.target.value)
    }


    useEffect(() => {
        if(props.location.state) {
            const {roomId} = props.location.state.from;
            setRoomName(roomId);
        }
    }, [])
  
    return (
        <div>
            <div className='bg'></div>
            <div className="login-container">
            <div className='out-btn'></div>
            <h1>welcome dear <span>{username}</span></h1>
            <h2>Please type a room name to create a new one or to join an existing one.</h2>
            <input type="text" placeholder="Enter a room name..." value={roomName}
                onChange={roomNameChangeHandler}
                className="text-input-field" />
            <Link to={`/${roomName}`} className="enter-room-button">
                Join/Create
            </Link>
        </div>
            
        </div>
    )
}

export default Lobby

import React, { useEffect, useState } from 'react'
import Identicon from 'react-identicons';
import { useSelector } from 'react-redux';

import './Message.css'

function Message({msg, socket, roomId}) {

    const profilePic = useSelector((state) => state.user.userUrlPic)
    // Randomly chosen foreground colours for profile pic
    const profileFgPalette = ["#4c96ed", "#ed4ceb", "#4cede7", "#ede517", "#ed5417", "#e52925"]
    const joinerId = useSelector(state => state.user.newJoinerId)
    const username = useSelector(state => state.user.newJoiner)
    const accept = () => {
        socket.emit('accepted', { roomId, username, joinerId})
    }

    return (
        <div className="message-container">
            <div className="profile">
                {profilePic ? <img src={profilePic} alt=""></img> : <Identicon palette={profileFgPalette} size={40} bg="#35395e" string={msg.username} />}
            </div>
            <div className="message-content">
                <div className="message-top-content">
                    <div className="username" style={{ color: msg.username === "Room BOT" ? "red" : "yellow" }}>
                        {msg.username ? msg.username : "Unknown"}
                        </div>
                    <div className="time">
                        {msg.time}
                    </div>
                </div>
                <div className="message">
                {msg.content.includes('wants to join') ? 
                <>{msg.content} 
                <button onClick={() => accept()}>yes</button>
                <button>No</button>
                </> 
                : msg.content}  
                </div>
            </div>
        </div>
    )
}

export default Message

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setRoomId } from 'redux/RoomSlice'

import ChatBox from 'components/ChatBox';
import VideoPlayer from 'components/VideoPlayer';

import './PartyRoom.css';

import socketio from "socket.io-client";
import Suggested from 'components/Suggested';
import TopBar from 'components/TopBar/TopBar';

const SOCKET_URL = "http://localhost:5000";
let socket = socketio.connect(SOCKET_URL);

function PartyRoom(props) {
    const dispatch = useDispatch()

    const { roomId } = props.match.params;

    const username = useSelector((state) => state.user.username)

    const [serverStatus, setServerStatus] = useState(false)

    useEffect(() => {
        socket.emit('join', { username: username, roomId }, error => { });

        setServerStatus(socket.connected);
        socket.on("disconnect", () => {
            setServerStatus(socket.connected); 
        });

        dispatch(setRoomId({ id: roomId }))

    }, [dispatch,roomId,username])


    return (
        <div className="container">
            <div className="left-container">
                <Suggested socket={socket} />
           
            <div className="right-wrapper">
                <TopBar/>
                <div className="right-container"> 
                    <VideoPlayer socket={socket} />
                    <ChatBox socket={socket} />
                </div>
            </div>
            </div>
        </div>
       
    )
}

export default PartyRoom

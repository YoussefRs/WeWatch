import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux' 
import { Link } from "react-router-dom"; 
import './Lobby.css'  
import axios from 'axios';
import io from 'socket.io-client';
import Loading from 'components/Loading/Loading';

const ENDPOINT = 'http://localhost:5000';
const socket = io.connect(ENDPOINT);
        
function Lobby(props) { 
    const username = useSelector((state) => state.user.username)
    const [toRoom, setToRoom] = useState(null)
    const [roomName, setRoomName] = useState('')
    const [roomInfo, setRoomInfo] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false)
    const roomNameChangeHandler = e => {
        setRoomName(e.target.value)
    }
    
   
    useEffect(() => {
        
        if(props.location.state) {
            const {roomId} = props.location.state.from;
            setRoomName(roomId);
        }

        axios.get(`${ENDPOINT}/rooms`).then((res) => {
            console.log(res)
            setRoomInfo(res.data);
        });

        socket.on('req-accepted',({roomId, username}) => {
            if (roomId) {
                setRedirect(true)
                setToRoom(roomId)
                
            }
        })
        if (toRoom) {
            props.history.push(`/${toRoom}`);
          }
    }, [props.history, toRoom, roomInfo]);

    const sendJoinRequest = (roomId) => {
        setLoading(true)
        socket.emit('join-request', { username, roomId } )
      };
    
    return (
        <div>
            {loading ? 
                <Loading />
                :
                <>
                <div className='bg'></div>
                <div className="login-container">
                    <div className='out-btn'></div>
                    <h1>welcome dear <span>{username}</span></h1>
                    <h2>Please type a room name to create a new one or join an available one.</h2>
                    <input type="text" placeholder="Enter a room name..." value={roomName}
                        onChange={roomNameChangeHandler}
                        className="text-input-field" />
                    <Link to={`/${roomName}`} className="enter-room-button">
                        Create
                    </Link>
                    <h1>Available rooms : </h1>
                    {Object.entries(roomInfo).map(([roomName]) => (
                        <div key={roomName} >
                            <button onClick={() => sendJoinRequest(roomName)} className="roomLink">{roomName}</button>
                        </div>
                    ))}
                </div>
                </>
            }
        </div>
    )
}

export default Lobby

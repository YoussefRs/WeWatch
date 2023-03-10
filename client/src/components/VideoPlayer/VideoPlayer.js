import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ReactPlayer from 'reactjs-player-v2/youtube'

import { setVideoIsPlaying, setPlayingTitle, setVideoURL, setPlaybackRate } from 'redux/VideoPlayerSlice'

import './VideoPlayer.css';

function VideoPlayer({ socket }) {
    const dispatch = useDispatch()

    const [prevCurrTime, setPrevCurrTime] = useState(0)
    const [currTime, setCurrTime] = useState(0)

    const remoteControl = useRef(false);
    const playerRef = useRef(null);

    const roomId = useSelector((state) => state.room.roomId)

    const videoURL = useSelector((state) => state.videoPlayer.videoURL)
    const isPlaying = useSelector((state) => state.videoPlayer.isPlaying) 
    const pbRate = useSelector((state) => state.videoPlayer.playbackRate) 

    const username = useSelector((state) => state.user.username)
    const isHost = useSelector((state) => state.chat.host)

    function updateVideoTitle() {
        const currVideoTitle = playerRef.current.getInternalPlayer().getVideoData().title;
        dispatch(setPlayingTitle({ playingTitle: currVideoTitle }));
    }

    function setPlayerRef(player) {
        playerRef.current = player
    }


    function playVideoHandler() {
        dispatch(setVideoIsPlaying({ playing: true }));

        if (remoteControl.current === false) {

            const newPacket = {
                roomId: roomId,
                username : username
            };

            socket.emit("client:play", newPacket);
        }
        remoteControl.current = false
    }

    function pauseVideoHandler() {
        dispatch(setVideoIsPlaying({ playing: false }));

        if (remoteControl.current === false) {
            const newPacket = {
                roomId: roomId,
                username : username
            };

            socket.emit("client:pause", newPacket);
        }
        remoteControl.current = false
    }

    function onProgressHandler() {
        setPrevCurrTime(currTime)
        setCurrTime(playerRef.current.getCurrentTime())

        const timeDiff = currTime - prevCurrTime

        
        if (timeDiff > (1.5 * pbRate) || timeDiff < 0) {
            const newPacket = {
                username: username,
                currentTime: playerRef.current.getCurrentTime(),
                roomId: roomId,
            }

            socket.emit("client:seekTo", newPacket);
        }
    }

    function playbackRateChangeHandler() { 
        const currPlaybackRate = playerRef.current.getInternalPlayer().getPlaybackRate()
        dispatch(setPlaybackRate({ playbackRate: currPlaybackRate }));

        if (remoteControl.current === false) {
            const newPacket = {
                roomId: roomId,
                playbackRate: currPlaybackRate,
            }; 
    
            socket.emit("client:update-playbackRate", newPacket);
        }
        remoteControl.current = false
    }

    function onStartHandler() {
        updateVideoTitle()
    } 

    function videoStateUpdater() {
        // request a sync when player is ready
        if (!isHost) {
            socket.emit("client:request-sync", { roomId });
        }

        // host is notified of a request sync and sends out the data
        // the server will only send this privately to hosts
        socket.on("server:request-host-data", () => {

            const newPacket = {
                playing: playerRef.current.props.playing, 
                currentTime: playerRef.current.getCurrentTime(),
                playbackRate: playerRef.current.getInternalPlayer().getPlaybackRate(),
                roomId: roomId,
            }
            socket.emit("client:host-data", newPacket);
        });

        
        socket.on("server:host-data", (packet) => {
            dispatch(setVideoIsPlaying({ playing: packet.playing }));
            playerRef.current.seekTo(packet.currentTime, 'seconds')
            dispatch(setPlaybackRate({ playbackRate: packet.playbackRate })); 
        });

        socket.on("server:play", () => {
            remoteControl.current = true;
            dispatch(setVideoIsPlaying({ playing: true }));
        });

        socket.on("server:pause", (packet) => {
            remoteControl.current = true;
            dispatch(setVideoIsPlaying({ playing: false }));
            
        });

        socket.on("server:update-playbackRate", (packet) => { 
            remoteControl.current = true;
            dispatch(setPlaybackRate({ playbackRate: packet.playbackRate })); 
        });

        socket.on("server:seekTo", (packet) => {
            remoteControl.current = true;
            playerRef.current.seekTo(packet.currentTime, 'seconds');
        });

        socket.on("server:video-change", (packet) => {
            remoteControl.current = true;
            dispatch(setVideoURL({ videoCode: packet.videoCode }));
        });
    }

    return (
        <div className="video-container">
            <ReactPlayer
                ref={setPlayerRef}
                width="100%"
                height="100%"
                url={videoURL}
                playing={isPlaying}
                controls={true}
                playbackRate={pbRate}
                onReady={videoStateUpdater}
                onStart={onStartHandler}
                onPlay={playVideoHandler}
                onPause={pauseVideoHandler}
                progressInterval={1000}
                onProgress={onProgressHandler}
                onPlaybackRateChange={playbackRateChangeHandler} />
            {/* <h3>{isHost ? <h1>I HOST</h1> : "not the host!"}</h3> */}
        </div>
    )
}

export default VideoPlayer

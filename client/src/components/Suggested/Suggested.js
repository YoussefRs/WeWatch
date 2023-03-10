import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux' 

import { scrapeVideos } from 'libs/youtubeV3/YoutubeScraper'
import SuggestedVideo from 'components/SuggestedVideo'

import './Suggested.css'
import VideoSearchBar from 'components/VideoSearchBar'

function Suggested({ socket }) {
    const [videos, setVideos] = useState([])
    const [searchQuery, setSearchQuery] = useState('lofi') 

    const movieMode = useSelector((state) => state.room.movieMode)

    useEffect(() => {
        scrapeVideos(searchQuery, 12).then((data) => {
            setVideos([]); 

            data.map((item) => {
                const newVideo = {
                    videoCode: item.video.id,
                    title: item.video.title,
                    channelTitle: item.uploader.username,
                    published: item.video.upload_date,
                    thumbnail: item.video.thumbnail_src,
                    duration: item.video.duration,
                    views: item.video.views
                }
                setVideos(prevVideos => [...prevVideos, newVideo]);

            })

        }, (err) => {
            console.error(err);
        })
    }, [searchQuery])

    return (
        <div className={movieMode ? "hide" : "suggested-container"}> 
            <VideoSearchBar setSearchQuery={setSearchQuery} />

            { videos.map((video) => {
                return <SuggestedVideo key={video.videoCode} socket={socket} video={video} />
            })
            }
        </div>
    )
}

export default Suggested

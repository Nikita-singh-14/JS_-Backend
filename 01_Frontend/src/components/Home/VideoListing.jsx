import React, { useEffect, useState } from 'react'
import VideoCard from '../Card/VideoCard'

const VideoListing = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/video/allVideos")
                if (!response.ok) {
                    console.log("ERROR: Failed to fetch video")
                }
                const data = await response.json()
                console.log(data.data.videos)
                setVideos(data.data.videos)
            } catch (error) {
                console.log(error)
            }
        }
        getVideo()
    }, [])




    return (
        // <div className='flex flex-col bg-gray-800 p-4 gap-4 px-60 min-h-screen'>
        //     <VideoCard description={videos[0].description}/>
        // </div>
        
            <div className='flex  bg-gray-800 p-4 gap-4 px-60 min-h-screen'>
            {videos.length > 0 ? (
                videos.map((video) => (
                    <VideoCard 
                        key={video._id || video.id} 
                        video={video}
                        description={video.description} 
                        thumbnail={video.thumbnail}
                        duration={video.duration}
                        createdAt={video.createdAt}
                    />
                ))
            ) : (
                <p className='text-white'>No videos found.</p>
            )}
        
        </div>

    )
}

export default VideoListing
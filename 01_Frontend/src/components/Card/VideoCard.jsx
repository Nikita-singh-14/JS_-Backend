
const VideoCard = ({thumbnail, description, ownerName, createdAt, channelName, duration}) => {

    return (
        <div className="flex justify-center items-center p-4 ">
            <div className="flex flex-col  hover:bg-gray-700 hover:rounded p-6">
                <div>
                    <img src={thumbnail} alt="" className="w-60" />
                    <p>{duration}</p>
                </div>
                <div className="flex gap-2">
                    <img src={ownerName} alt="channel profilepic" className="w-20 rounded-full" />
                    <div>
                        <h2>{description}</h2>
                        <p>{channelName}</p>
                        <p>{createdAt}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default VideoCard
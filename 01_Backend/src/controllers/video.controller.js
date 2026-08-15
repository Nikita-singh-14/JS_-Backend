// https://github.com/hiteshchoudhary/chai-backend/blob/main/src/controllers/video.controller.js

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.model.js";
import { jwtVerify } from "../middleware/auth.middleware.js";

const videoUpload = asyncHandler(async(req, res) => {
    
        const {title, description} = req.body
        if(!title?.trim()){
            throw new ApiError(401, "title is required")
        }

        console.log(req.body)

        const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
        const videoLocalPath = req.files?.videofile?.[0]?.path;
        

        if(!videoLocalPath){
            throw new ApiError(400, "Video file is required")
        }
        
        const thumbnail = thumbnailLocalPath ? await uploadOnCloudinary(thumbnailLocalPath) : '';
        const videofile = await uploadOnCloudinary(videoLocalPath);

        // console.log(thumbnail?.url)
        // console.log(videofile.url)

        const video = await Video.create({
                title,
                description,
                thumbnail: thumbnail?.url || '',
                videofile: videofile.url,
                duration: videofile.duration,               
                views: 0,
                isPublished: true,
                owner: req.user._id
        });

        console.log(video)

        return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video file uploaded Successfully")
        )

   
})

const getVideoById = asyncHandler(async(req, res) => {
    const { videoId } = req.params;
    if(!videoId){
        throw new ApiError(400, "video id is required")
    }

    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(400, "video not found")
    }
    return res.status(200)
    .json(new ApiResponse(200, video, "fechted video successfully"))
})

// const updateVideo = asyncHandler(async (req, res) => {
//     const { videoId } = req.params
//     //TODO: update video details like title, description, thumbnail

// })

export { videoUpload, getVideoById}
import mongoose, { Aggregate } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggelVideoLike = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    if(!videoId){
        throw new ApiError(400, "video Id does not exit")
    }
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400, "video enster valif video id")
    }
    const video = await Video.aggregate([
        {
            $match:{
                _Id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"video",
                as:"videoLike"
            }
        },
        {
            $addFields:{
                videoLike:{
                    $size: "$videoLike"
                }
            }
        },
        {
            $project:{
                videoLike: 1,
            }
        }
    ])

    console.log(video)
    return res.status(200).json(new ApiResponse(200, "video like"))
})

const toggelCommentLike = asyncHandler(async(req, res) => {
    const { commentId } = req.params
})

const toggelTweetLike = asyncHandler(async(req, res) => {
    const {tweetId} = req.params
})

const getLikedVideos = asyncHandler(async(req, res) => {

})

export {toggelVideoLike, toggelCommentLike, toggelTweetLike, getLikedVideos}
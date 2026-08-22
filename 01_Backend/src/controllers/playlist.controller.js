import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model";
import { Video } from "../models/video.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createPlaylist = asyncHandler(async(req, res) => {
    const {name, description} = req.body
    if(!name || !description){
        throw new ApiError(400, "Name and description are required to create a playlist")
    }

    const playlist = await Playlist.create({
        title: name,
        description,
        owner: req.user?._id,
        videos: []
    })

    if(!playlist){
        throw new ApiError(500, "something went wrong while creation playlist")
    }

    return res.status(200)
    .json(new ApiResponse(200, playlist, "playlist created successfully"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!playlistId){
        throw new ApiError(400, "playlistId is required")
    }
    if(!videoId){
        throw new ApiError(400, "videoId is required")
    }

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId")
    }

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId")
    }

    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(400, "playlist does not exit of this id")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(400, "video does not exit of this id")
    }

    if(playlist.videos.includes(videoId)){
        throw new ApiError(400, "this video is already in your playlist")
    }
    
    playlist.videos.push(videoId)
    await playlist.save()
    
    return res.status(201)
    .json(new ApiResponse(201, playlist, "video added in playlist successfully"))
})

const getUserPlaylists = asyncHandler(async(req, res) => {
    const {userId} = req.params
    if(!userId){
        throw new ApiError(400, "user Id is required")
    }

    if(!mongoose.isValidObjectId(userId)){
        throw new ApiError(404, "User does not exit")
    }

    const userPlaylists = await Playlist.find({
        owner: userId
    }).sort({createdAt: -1})

    return res.status(201)
    .json(new ApiResponse(201, userPlaylists, "get all playlists of this user"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    if(!playlistId){
        throw new ApiError(400, "playlist Id is required")
    }
    if(!mongoose.isValidObjectId(playlistId)){
        throw new ApiError(404, "playlist does not exit")
    }

    const playList = await Playlist.findById(playlistId)

    if (!playList) {
        throw new ApiError(404, "Playlist does not exist")
    }

    return res.status(200)
    json(200, playList, "fetch playlist successfully")
})


const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!playlistId){
        throw new ApiError(400, "playlistId is required")
    }
    if(!videoId){
        throw new ApiError(400, "videoId is required")
    }

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId")
    }

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId")
    }

    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(400, "playlist does not exit of this id")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(400, "video does not exit of this id")
    }

    const videoExists = playlist.videos.some(
        (id) => id.toString() === videoId
    )

    if (!videoExists) {
        throw new ApiError(
            404,
            "Video does not exist in this playlist"
        )
    }

    playlist.videos.pull(videoId)
    await playlist.save()

    return res.status(200)
    .json(200, removeVideo, "video deleted successfully")

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    if(!playlistId){
        throw new ApiError(400, "playlistId is required")
    }
    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId")
    }

    const playlist = await Playlist.findByIdAndDelete({
        _id: playlistId,
        owner: req.user?._id
    })
    if(!playlist){
        throw new ApiError(400, "playlist does not exit of this id")
    }

    return res.status(200)
    .json(new ApiResponse(200, playlist, "playlist deleted successfully"))

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body

    if(!playlistId){
        throw new ApiError(400, "playlistId is required")
    }
    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId")
    }

    if(name === undefined || description === undefined){
        throw new ApiError(400, "Name and description are required to create a playlist")
    }
    const updateData = {}
    if(name){
        if (!name.trim()) {
            throw new ApiError(
                400,
                "Playlist name cannot be empty"
            )
        }
        updateData.title = name
    }
    if(description){
        if (!description.trim()) {
            throw new ApiError(
                400,
                "Playlist description cannot be empty"
            )
        }
        updateData.description = description
        
    }

    const playlist = await Playlist.findByIdAndUpdate(
        {
            _id: playlistId,
            owner: req.user?._id
        },
        {
            $set: updateData
        },
        {
            new: true
        }
    )

    if(!playlist){
        throw new ApiError(500, "something went wrong while updating the playlist")
    }

    return res.status(200)
    .json(new ApiResponse(200, playlist, "update playlist successfully"))
})

export {
    createPlaylist, 
    getPlaylistById, 
    getUserPlaylists, 
    updatePlaylist, 
    deletePlaylist, 
    addVideoToPlaylist, 
    removeVideoFromPlaylist
}
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res) => {
    // get user details from user like email, password, fullname etc.
    // check these feild are not empty
    // check username and email is unique check in database
    // check avatar and then send to cloudinary and get url from cloudinary
    // remove password and refresh token feild from response
    // store all dta in database
    // send succefull message to the user
    // remove avatar url from multer
    const {fullName, username, password, email} = req.body
    console.log(req.body)

    // if(username === ''){
    //     throw new ApiError(400, 'username is required');
    // }
    // if(fullName === ''){
    //     throw new ApiError(400, 'fullName is required');
    // }

    if([username, fullName, email, password].some((feild) => feild?.trim() === '')
    ) {
        throw new ApiError(400, "All Feilds are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existedUser){
        throw new ApiError(409, "user with email or username already exits")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;
   
    if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
   }
    
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
        email,
        password,
        username: username.toLowerCase()
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})



export {registerUser}
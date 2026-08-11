import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateRefreshAndAccessTokens = async(userId) => {
    try {
       const user = await User.findById(userId);
       const accessToken = user.generateAccessToken();
       const refreshToken = user.generateRefreshToken();

       user.refreshToken = refreshToken;
       user.save({validateBeforeSave: false})

       return {accessToken, refreshToken}
    } catch (error) {
        throw ApiError(500, "Something went wrong while generating access and refresh token")
    }
}

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

const loginUser = asyncHandler(async(req, res) => {
    // take data from req.body
    // find that email or username from the User database
    // if get throw an apierror
    // if not compare user passwrod with datapase decrepted password with the help of jwtverify
    // if both match throw apiresponse
    // access and refresh token
    // send cookies
    // if not throw an error apierror

    const {email, username, password } = req.body;
    if(!(email || username)){
        throw ApiError(400, "username or email is required feild")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw ApiError(400, "This email or username not found")
    }

    const isPasswrodValide = await user.isPasswordCorrect(password);

    if(!isPasswrodValide){
        throw ApiError(401, "Invalide user credentials")
    }

    const {accessToken, refreshToken} = await generateRefreshAndAccessTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken,refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.
    refreshToken || req.body.refreshToken

    try {
        if(incomingRefreshToken){
            throw new ApiError(401, "Unauthorized request")
        }
        jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid Refresh Token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateRefreshAndAccessTokens(user._id)
    
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                   accessToken, refreshToken: newRefreshToken
                },
                "Access token successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})



export {registerUser, loginUser, logoutUser, refreshAccessToken}
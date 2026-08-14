import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

const videoUpload = asyncHandler(async(req, res) => {
    try {
        const {title, description} = req.body
        if(!title.trim()){
            throw new ApiError(401, "title is required")
        }
    } catch (error) {
        throw new ApiError(500, "something went worng, while uploading video")
    }
})
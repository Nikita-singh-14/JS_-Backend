import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { getVideoById, videoUpload } from "../controllers/video.controller.js";
const router = Router()

router.route("/upload-video").post(jwtVerify, upload.fields([
    {
        name: "videofile",
        maxCount: 1
    },
    {
        name: "thumbnail",
        maxCount: 1
    }
]), 
videoUpload
)

router.route("/:videoId").post(jwtVerify, getVideoById)

// router.route("/upload-video").post(jwtVerify, videoUpload)

export default router
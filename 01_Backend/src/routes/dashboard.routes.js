import { Router } from "express";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller";
import { jwtVerify } from "../middleware/auth.middleware";

const router = Router()

router.route("/videos").get(jwtVerify, getChannelVideos)
router.route("/stats").get(jwtVerify, getChannelStats)

export default router
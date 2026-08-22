import { Router } from "express";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller";
import { jwtVerify } from "../middleware/auth.middleware";

const router = Router()

router.route("/channel/:channelId/videos").get(jwtVerify, getChannelVideos)
router.route("/channel/:channelId/stats").get(jwtVerify, getChannelStats)


export default router
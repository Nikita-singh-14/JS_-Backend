import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { getUserTweets } from "../controllers/tweet.controller.js";

const router = Router();

router.route("/user-tweet").get(jwtVerify, getUserTweets)

export default router
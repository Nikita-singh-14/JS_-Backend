import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getVideoComment, updateComment } from "../controllers/comment.controller.js";

const router = Router();

router.route("/video-comment/").get(jwtVerify, getVideoComment)
router.route("/add-comment").post(jwtVerify, updateComment)
router.route("/update-comment").patch(jwtVerify, addComment)
router.route("/delete-comment").delete(jwtVerify, deleteComment)

export default router
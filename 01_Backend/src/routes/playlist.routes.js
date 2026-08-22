import { Router } from "express";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";
import { jwtVerify } from "../middleware/auth.middleware.js"


const router = Router();

router.route("/create").post(jwtVerify, createPlaylist)
router.route("/playlist-id").get(jwtVerify, getPlaylistById)
router.route("/user-playlist").get(jwtVerify, getUserPlaylists)
router.route("/add-video").post(jwtVerify, addVideoToPlaylist)
router.route("/remove-video").delete(jwtVerify, removeVideoFromPlaylist)
router.route("/delete-playlist").delete(jwtVerify, deletePlaylist)
router.route("/update").patch(jwtVerify, updatePlaylist)

export default router
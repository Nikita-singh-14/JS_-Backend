import { Router } from "express";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller";

const router = Router()

router.route("/toggle/:channelId").patch(toggleSubscription)
router.route("/subscribers/:channelId").get(getUserChannelSubscribers)
router.route("/subscribed-channels/:subscriberId").get(getSubscribedChannels)

export default router
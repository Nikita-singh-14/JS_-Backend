import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware";
import { healthcheck } from "../controllers/healthcheck.controller";

const router = Router()

router.route("/healthCheck").get(jwtVerify, healthcheck)

export default router
import { Router } from "express";
import { acceptInvite } from "../controller/acceptInvite.controller";

const acceptInviteRoute = Router()
acceptInviteRoute.post("/accept/:friendReqId",acceptInvite)

export default acceptInviteRoute
import { Router } from "express";
import { sendInvite } from "../controller/sendInvite.controller";


const sendInviteRoute = Router()
sendInviteRoute.post("/send" ,sendInvite )

export default sendInviteRoute
import { Router } from "express";
import userRouter from "./user.routes";
import sendInviteRoute from "./sendInvite.routes";
import acceptInviteRoute from "./acceptInvite.route";



const rootRouter =  Router();
rootRouter.use("/auth" , userRouter)
rootRouter.use("/invite",sendInviteRoute)
rootRouter.use("/invite",acceptInviteRoute)


export default rootRouter;
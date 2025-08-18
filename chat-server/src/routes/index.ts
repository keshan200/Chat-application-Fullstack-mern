import { Router } from "express";
import userRouter from "./user.routes";
import messageRouter from "./message.routes";


const rootRouter =  Router();
rootRouter.use("/auth" , userRouter)
rootRouter.use("/message",messageRouter)


export default rootRouter;
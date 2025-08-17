import { Router } from "express";
import { signUp } from "../controller/auth.controller";

const userRouter = Router()
userRouter.post("/signup" , signUp)

export default userRouter
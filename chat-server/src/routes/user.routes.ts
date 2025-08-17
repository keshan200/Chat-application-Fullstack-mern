import { Router } from "express";
import { getAllUsers, login, logout, refreshToken, signUp } from "../controller/auth.controller";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const userRouter = Router()
userRouter.post("/signup" , signUp)
userRouter.post("/login",login)
userRouter.get("/get",authenticateToken,getAllUsers)
userRouter.post("/refresh-token",refreshToken)
userRouter.post("/logout",logout)

export default userRouter
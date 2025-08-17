import express from "express";
import * as dotenv from "dotenv";
import {connectDB} from "./db/mongo"
import rootRouter from "./routes"
import { errorHandler } from "./middlewares/errorHandler"


dotenv.config()
const app =  express()
app.use(express.json())


const PORT = process.env.PORT
app.use("/api",rootRouter)
app.use(errorHandler)
app.use("/uploads", express.static("uploads"));




connectDB().then(()=>{
 app.listen(PORT,async () => {
    console.log(`server running on http://localhost:${PORT}`)
 })
})




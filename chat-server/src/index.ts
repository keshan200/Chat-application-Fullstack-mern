import express from "express";
import * as dotenv from "dotenv";
import {connectDB} from "./db/mongo"
import rootRouter from "./routes"
import { errorHandler } from "./middlewares/errorHandler"
import cookieParser from "cookie-parser"
import { Server } from "socket.io";

import http from "http";
import cors from "cors";
import { socketHandler } from "./sockets/SocketHandler";

dotenv.config()

const app =  express()


const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
  methods: "GET,PUT,PATCH,DELETE,POST,HEAD",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())


const PORT = process.env.PORT
app.use("/api",rootRouter)
app.use(errorHandler)
app.use("/uploads", express.static("uploads"));





const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN, 
    methods: ["GET", "POST"],
    
  },
});
socketHandler(io);





connectDB().then(()=>{
 server.listen(PORT,async () => {
    console.log(`server running on http://localhost:${PORT}`)
 })
})




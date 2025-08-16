import dotenv from "dotenv"
import express ,{Request,Response}from "express"
import { connectDB } from "./db/mongo"
import rootRouter from "./routes"

dotenv.config()
const app =  express()

const PORT = process.env.PORT

app.use("/api",rootRouter)
app.use(express.json())




connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
})
import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoute.js'
dotenv.config()

let port = process.env.PORT || 6000

let app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.get("/",(req,res)=>{
    res.send("hello from server");
})

app.listen(port,()=>{

    console.log("hello from seerver")
    connectDb()
})


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:true,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static("public"))

//routes import
import userRouter from "./router/user.router.js";
import jobRouter from "./router/job.router.js"
import applicationRouter from "./router/application.router.js"

//routes Use

app.use("/api/v1/user", userRouter)
app.use("/api/v1/", jobRouter)
app.use("/api/v1/", applicationRouter)
export {app}
import dotenv from "dotenv"
import { app } from "./app.js"
import {connectDB} from "./db/db.js"

dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is working on PORT:${process.env.PORT}`);
        
    })
}).catch((err)=>{
    console.log("database connection failed!", err);
    
})
import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_PATH)
        .then(()=>{
            console.log("Database Connected!");
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
export {connectDB}
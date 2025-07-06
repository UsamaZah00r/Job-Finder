import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const verifyJwt = async (req, res, next)=>{
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
           return res.status(404).json({msg:"token is missing or not found!"})
        }

        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)

        const user = await User.findById(verifyToken?.id).select("-password");

        if(!user){
           return res.status(404).json({msg:"User not found in auth!"})
        }
        req.user = user
        next()
    } catch (error) {
       return res.status(400).json({msg:"auth is not working!"})
    }
}
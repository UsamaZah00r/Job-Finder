import jwt from "jsonwebtoken"

export const createToken = (user)=>{
    return jwt.sign({
        id:user._id,
    }, process.env.TOKEN_SECRET, {expiresIn:process.env.TOKEN_EXPIRY})
}
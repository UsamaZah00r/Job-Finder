import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        lowercase: true
    },
    email:{
        required:true,
        type:String,
        unique:true,
         trim: true,
        lowercase: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['seeker', 'employer']
    },
    profileImage:{
        type:String,
        required:true
    }
},{timestamps:true})


const User = mongoose.model("User", userSchema)

export default User
import mongoose, {Schema} from "mongoose"

const jobSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
           type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum:["onSite", "Remote"],
        default:"onSite"
    },
    companyName:{
        type:String,
        required:true
    },
    category:{
         type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    applicants:{
        type:Schema.Types.ObjectId,
        ref:"Application"
    }
},{timestamps:true})

const Job = mongoose.model("Job", jobSchema)

export default Job
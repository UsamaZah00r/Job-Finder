import mongoose, {Schema} from "mongoose"

const applicationSchema = new Schema({
    jobId:{
        type:Schema.Types.ObjectId,
        ref:"Job"
    },
    seekerId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' },
     resumeUrl:{
        type:String,
        required:true
     },
  status: { type: String,
    enum: ['applied', 'reviewed', 'accepted', 'rejected'],
    default: 'applied' },
},{timestamps:true})


const Application = mongoose.model("Application", applicationSchema)

export default Application
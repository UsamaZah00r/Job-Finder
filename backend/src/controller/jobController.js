import Job from "../models/job.model.js"

export const showJobs = async (req, res)=>{
    const jobs = await Job.find()

    if(!jobs){
        res.status(404).json({msg:"no job is created!"})
    }

    res.status(200).json({jobs})
}

export const showJobDetail = async (req, res)=>{
    const jobId = req.params.id;
   
    
    try {
       const  jobDetail = await Job.findById(jobId)
       if(!jobDetail){
        return res.status(404).json({msg:"no jobdetail found!"})
       }
       res.status(200).json({jobDetail})
    } catch (error) {
        res.status(400).json({msg:"something went wrong in job detail"})
    }
}


export const showEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ msg: "No jobs found for this employer." });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching employer jobs." });
  }
};



export const createJobs = async (req, res)=>{
    const {title, description, location, jobType, companyName, category} = req.body
    try {
        if(!title || !description || !location ||  !companyName || !category){
            return res.status(400).json({msg:"fill all fields"})
        }

        const job = await Job.create({
            title,
            description,
            location,
            jobType,
            companyName,
            category,
            createdBy: req.user._id
        })
       res.status(201).json({msg: "Job created successfully!", job})
    } catch (error) {
        return res.status(400).json({msg:"job creating failed!"})
    }
}


export const updateJobs = async (req, res)=>{
    const {title, description, location, jobType} = req.body
    const {id} = req.params

    try {
        const updateJob = await Job.findByIdAndUpdate(id, {
            title,
            description,
            location,
            jobType
        }, {new:true})
        if(!updateJob){
            return res.status(400).json({msg:"job not updated"})
        }
        res.status(200).json({msg:"Job Updated"})
    } catch (error) {
        return res.status(400).json({msg:"someThing in wrong in update job"})
    }
}

export const deleteJob = async (req, res)=>{
  const {id} = req.params
 try {
     const deleteJob = await Job.findByIdAndDelete(id)
   
     if(!deleteJob){
       return res.status(400).json({msg:"job not deleted"})
     }
     res.status(200).json(deleteJob)
 } catch (error) {
    return res.status(400).json({msg:"someThing in wrong in delete job"})
 }
}
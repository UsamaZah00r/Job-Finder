import { uploadOnCloudinary } from "../utils/cloudinary.js"
import Application from "../models/application.model.js"
import Job from "../models/job.model.js"



export const postApplication = async (req, res) => {
    const jobId = req.params.id;
    const seekerId = req.user._id;

    try {
        const existingApplication = await Application.findOne({ seekerId, jobId });

        if (existingApplication) {
            return res.status(400).json({ msg: "You have applied to this job before" });
        }

        if (!req.file || !req.file.path) {
            return res.status(404).json({ msg: "File not found" });
        }

        console.log(req.file.path);
        
        const resume = await uploadOnCloudinary(req.file.path); 


        if (!resume || !resume.url) {
  return res.status(400).json({ msg: "Resume upload to Cloudinary failed." });
}


        const newApplication = await Application.create({
            jobId,
            seekerId,
            resumeUrl: resume.url
        });

        await Job.findByIdAndUpdate(jobId, {
            $push: { applicants: newApplication._id }
        });

        res.status(200).json({ msg: "New application created" });

    } catch (error) {
        console.error(error); // Optional: helpful during debugging
        return res.status(400).json({ msg: "Application creation failed" });
    }
};




export const getApplication = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user._id;

    const findJob = await Job.findById(jobId);
    if (!findJob) {
      return res.status(400).json({ msg: "No job found" });
    }

    if (findJob.createdBy.toString() !== employerId.toString()) {
      return res.status(403).json({ msg: "You are not authorized to view this job" });
    }

    const applicants = await Application.find({ jobId }).populate("seekerId", "name email");

    res.status(200).json({ applicants });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Something went wrong in getApplication" });
  }
};

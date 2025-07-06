import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getApplication, postApplication } from "../controller/applicationController.js";
import { upload } from "../middleware/multer.js";
const router = Router()

router.route("/jobs/:id/apply").post(verifyJwt, upload.single("resumeUrl"), postApplication)// for seeker
router.route("/jobs/:id/applicants").post(verifyJwt, getApplication) // for Employer

export default router
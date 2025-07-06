import {Router} from "express"
import { showJobs, showJobDetail, createJobs, updateJobs, deleteJob, showEmployerJobs } from "../controller/jobController.js"
import { verifyJwt } from "../middleware/auth.middleware.js"
const router = Router()

router.route("/jobs").get(showJobs)
router.route("/jobs/:id").get(showJobDetail)
router.route("/jobs").post(verifyJwt, createJobs)
router.route("/employer").get(verifyJwt, showEmployerJobs)
router.route("/jobs/:id").put(updateJobs)
router.route("/jobs/:id").delete(deleteJob)

export default router
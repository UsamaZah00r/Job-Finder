import { Router } from "express";
import { registerUser, loginUser, logoutUser, userInfo, authUser } from "../controller/userController.js";
import { upload } from "../middleware/multer.js";
import {verifyJwt} from "../middleware/auth.middleware.js"

const router = Router()

router.route("/register").post(upload.single("profileImage"), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/me").get(verifyJwt, userInfo)
router.route("/auth").get(verifyJwt, authUser)
export default router
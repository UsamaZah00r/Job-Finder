import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs"

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "Please fill all required fields" });
  }

  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!req.file || !req.file.path) {
      return res.status(400).json({ msg: "No image uploaded" });
    }

    const profileImageData = await uploadOnCloudinary(req.file.path);
    if (!profileImageData || !profileImageData.url) {
      return res.status(500).json({ msg: "Image upload failed" });
    }

    // Delete temp file safely
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: profileImageData.url,
    });

    const token = createToken(user);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};

export const loginUser = async (req, res)=>{
const {email, password} = req.body
try {
    const user = await User.findOne({email})

    
    if(!user){
        return res.status(404).json({
            msg:"email is not found"
        })
    }
    const match = await bcrypt.compare(password, user.password)

    if(!match){
       return res.status(400).json({
            msg:"password is incorrect"
        })
    }

    const token = createToken(user)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("token", token, options)
    .json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

} catch (error) {
   return res.status(400).json({
    msg: "something ent erong in login",
    
})
}
}


export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
    });

    return res.status(200).json({ msg: "User logout successfully!" });
  } catch (error) {
    return res.status(400).json({ msg: "Logout Failed!" });
  }
};



export const userInfo = async (req, res)=>{
  const user = await User.findById( req.user._id).select("-password -_id")

  if(!user){
    res.status(404).json({msg:"user not found!"})
  }

  res.status(200).json(user)
}


export const authUser = async (req, res)=>{
  try {
    res.status(200).json({loggedIn:true, user:req.user})
  } catch (error) {
    res.ststus(400).json({msg:"fail to auth user"})
  }
}
import User from "../models/user.model"
import jwt from "jsonwebtoken"

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token)return res.status(401).json({success: false, message: "Unauthorized user access"});
        const decodedToken = await jwt.verify(token, JWT_SECRET_KEY);
        const decodedUser = await User.findById(decodedToken._id).select("-password -refreshToken");
        if(!decodedUser)return res.status(401).json({success: false, message: "User not found"}); 
        req.user = decodedUser;
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Token Expired or invalid"
        })
    }

}

const isStudent = async ((req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return req.json({
                success: true,
                message: "Please provide the student role"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "User is not verified, Please try again later"
        })
    }
})

const isStaff = async ((req,res,next)=>{
    try{
        if(req.user.role !== "Staff"){
            return req.json({
                success: true,
                message: "Role is Student"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "User is not verified, Please try again later"
        })
    }
})

const isAdmin = async ((req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return req.json({
                success: true,
                message: "Role is Admin"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "User is not verified, Please try again later"
        })
    }
})


export {auth,isStudent,isAdmin,isStaff}
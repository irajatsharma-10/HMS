import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const auth = async (req, res, next) => {
    //read the token from req cookies
    //validate the token
    //find the user
    try {
        const token = req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user access"
            });
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedToken);
        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            return res.status(401)
                .json({
                    success: false,
                    message: "User not found"
                });
        }

        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token Expired or invalid"
        })
    }

}
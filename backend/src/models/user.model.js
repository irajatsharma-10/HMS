import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: Number, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        default: "Student",
        type: String,
        enum: ["Student", "Admin", "Staff"]
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    refreshToken:{
        type: String,
        trim: true,
        required: true
    }
},{timestamps: true})

userSchema.methods.passwordCorrect = function(){
    return bcrypt.compare(password,this.password);
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            full_name: this.full_name,
            role: this.role,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
 


const userFile = mongoose.model('User', userSchema)
module.exports = userFile
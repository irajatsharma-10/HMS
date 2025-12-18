import mongoose, {Schema, model} from "mongoose"

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
    password_hash: {
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
},{timestamps: true})

const userFile = mongoose.model('User', userSchema)
module.exports = userFile
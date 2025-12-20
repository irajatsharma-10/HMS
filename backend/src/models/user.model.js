import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    full_name: { type: String, required: true, trim: true },

    email: { type: String, required: true, trim: true, unique: true },

    phone: { type: String, required: true, minLength: 10, maxLength: 10 },                                               

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "admin", "staff"],
      default: "student"
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  const user=this;
  return jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};



const User = mongoose.model("User", userSchema);
export default User;
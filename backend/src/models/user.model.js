import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    full_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Student", "Admin", "Staff"],
      default: "Student"
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },
    refreshToken: { type: String, trim: true }
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
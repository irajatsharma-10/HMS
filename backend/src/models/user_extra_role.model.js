import mongoose, { Schema } from "mongoose";

const userRoleSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    trim: true,
    required: true
  }
},{timestamps: true});

const UserExtraRole = mongoose.model(
  "UserExtraRole",
  userRoleSchema
);

const userRole = model("UserRole", userRoleSchema);
module.exports = userRole
import mongoose, { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    student_id:{
      type: String,
      unique: true,
      required: true,
      min: [8,"Please provide valid student id"]
    },
    permanent_address:{
      type: String,
      trim: true,
      required: true,
    },
    guardian_name: {
      type: String,
      trim: true
    },
    guardian_contact: {
      type: Number,
      required: true
    },
    leaving_date: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Student = model("Student", studentSchema);
export default Student;
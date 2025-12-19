import mongoose, { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
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
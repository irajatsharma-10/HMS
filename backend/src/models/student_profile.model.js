import mongoose, {Schema, model} from "mongoose";

const studentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    gaurdian_name:{
        type: String,
        trim: "true"
    },
    guardian_contact:{
        type: Number,
        required: true,
    },
    createdAt: Date.now(),
    leaving_date: {
        type: Date,
        Default: null
    }
})

const student = model("Student", studentSchema)
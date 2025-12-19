import mongoose, {Schema, model} from "mongoose";

const issueSchema = new Schema({
    title:{
        required: true,
        type: String,
        trim: "true",
        lowercase: "true"
    },
    description:{
        required: true,
        type: String,
        trim: "true",
        lowercase: "true",
        min: [10, "Minimum character are required"],
        max: [100, "Word limit reached "]
    },
    category:{
        type: String,
        default: "drinkingWater",
        enum: ["drinkingWater", "plumbing", "furniture", "electricity", "other"]
    },
    priority:{
        type: String,
        default: "normal",
        enum: ["emergency", "normal", "high", "low"]
    },
    status:{
        type: String,
        default: "pending",
        enum: ["pending", "completed"],
    },
    raised_by:{
        type: Schema.Types.ObjectId,
        ref: "Student",

    }
},{timestamps: true})

export const issue = model("Issue", issueSchema);
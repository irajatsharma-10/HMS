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
        default: "DrinkingWater",
        enum: ["DrinkingWater", "Plumbing", "Furniture", "Electricity", "Other"]
    },
    priority:{
        type: String,
        default: "Normal",
        enum: ["Emergency", "Normal", "High", "Low"]
    },
    status:{
        type: String,
        default: "Pending",
        enum: ["Pending", "Completed"],
    },
    raised_by:{
        type: Schema.Types.ObjectId,
        ref: "Student",

    }
},{timestamps: true})

const issue = model("Issue", issueSchema);
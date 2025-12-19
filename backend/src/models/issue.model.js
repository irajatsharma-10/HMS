import mongoose, {Schema} from "mongoose";

const issueSchema = new Schema({
    title:{
        required: true,
        type: String,
        trim: true,
    },
    description:{
        required: true,
        type: String,
        trim: true,
        lowercase: true,
        min: [10, "Minimum character are required"],
        max: [100, "Word limit reached "]
    },
    category:{
        type: String,
        default: "DrinkingWater",
        enum: ["drinking-water", "plumbing", "furniture", "electricity", "other"]
    },
    status:{
        type: String,
        default: "pending",
        enum: ["pending", "resolved"],
    },
    raised_by:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student",
    }
},{timestamps: true})

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
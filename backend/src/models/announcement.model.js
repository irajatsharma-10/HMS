const announcementSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  audience: {
    type: String,
    enum: ["all", "students", "staff"],
    default: "all"
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const Announcement = model("Announcement", announcementSchema);
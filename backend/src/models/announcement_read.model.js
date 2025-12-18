const announcementReadSchema = new Schema({
  announcement_id: {
    type: Schema.Types.ObjectId,
    ref: "Announcement",
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  read_at: {
    type: Date,
    default: Date.now
  }
});
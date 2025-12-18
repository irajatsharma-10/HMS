const issueCommentSchema = new Schema({
  issue_id: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
    required: true
  },
  commented_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  comment_text: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

export const IssueComment = model("IssueComment", issueCommentSchema);
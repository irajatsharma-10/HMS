const issueStatusHistorySchema = new Schema({
  issue_id: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
    required: true
  },
  old_status: {
    type: String,
    required: true
  },
  new_status: {
    type: String,
    required: true
  },
  changed_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  changed_at: {
    type: Date,
    default: Date.now
  }
});

export const IssueStatusHistory = model(
  "IssueStatusHistory",
  issueStatusHistorySchema
);


const disciplinaryCaseSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  fine_amount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },
  decided_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

export const DisciplinaryCase = model(
  "DisciplinaryCase",
  disciplinaryCaseSchema
);


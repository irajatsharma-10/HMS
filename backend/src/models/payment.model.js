const paymentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ["cash", "upi", "card"],
    required: true
  },
  status: {
    type: String,
    enum: ["success", "failed"],
    required: true
  },
  reference: {
    type: String
  }
}, { timestamps: true });

export const Payment = model("Payment", paymentSchema);

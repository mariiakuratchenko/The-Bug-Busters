//The-Bug-Busters/backend/models/Question.js

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    answered: { type: Boolean, default: false },
    answer: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);

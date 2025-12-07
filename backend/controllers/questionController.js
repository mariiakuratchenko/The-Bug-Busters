//The-Bug-Busters/backend/controllers/questionController.js

const Question = require('../models/Question');
const User = require('../models/User');

// Create a new question
exports.createQuestion = async (req, res, next) => {
  try {
    const { text, productId, productName } = req.body;

    if (!text || !productId || !productName) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Get user info from token
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const question = await Question.create({
      text,
      productId,
      productName,
      userId: user._id,
      userEmail: user.email,
      userName: user.name
    });

    res.status(201).json(question);
  } catch (e) {
    next(e);
  }
};

// Get all questions (admin only)
exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (e) {
    next(e);
  }
};

// Get questions for a specific product
exports.getProductQuestions = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const questions = await Question.find({ productId }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (e) {
    next(e);
  }
};

// Delete a question (admin only)
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted" });
  } catch (e) {
    next(e);
  }
};

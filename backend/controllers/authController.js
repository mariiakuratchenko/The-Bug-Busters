const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ id: user._id, email: user.email });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (e) {
    next(e);
  }
};

exports.me = async (req, res, next) => {
  try {

    res.json({ message: "Protected route works" });
  } catch (e) {
    next(e);
  }
};

exports.logout = async (req, res) => {
  return res.json({ message: "Logged out successfully" });
};

exports.updateAccount = async (req, res, next) => {
  try {
    const { currentEmail, currentPassword, newEmail, newPassword } = req.body;

    // Validation
    if (!currentEmail || !currentPassword) {
      return res.status(400).json({ message: "Current email and password are required" });
    }

    if (!newEmail && !newPassword) {
      return res.status(400).json({ message: "Please provide at least one field to update" });
    }

    // Find user by current email
    const user = await User.findOne({ email: currentEmail });
    if (!user) {
      return res.status(400).json({ message: "Current email is incorrect" });
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Verify the token matches the user
    if (req.user._id !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check if new email is already taken by another user
    if (newEmail && newEmail !== currentEmail) {
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(400).json({ message: "New email is already registered" });
      }
      user.email = newEmail;
    }

    // Update password if provided
    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.json({ 
      message: "Account updated successfully",
      email: user.email 
    });
  } catch (e) {
    next(e);
  }
};


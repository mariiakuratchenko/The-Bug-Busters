// backend/controllers/userController.js
const User = require("../models/User");

exports.getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id).select("-password");
    res.json(me);
  } catch (e) { next(e); }
};

exports.updateMe = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    const me = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    res.json(me);
  } catch (e) { next(e); }
};

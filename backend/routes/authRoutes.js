// backend/routes/authRoutes.js
const router = require("express").Router();
const ctrl = require("../controllers/authController");
const auth = require("../middleware/auth");

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working" });
});

// Register
router.post("/register", ctrl.register);

// Login
router.post("/login", ctrl.login);

// Protected "me" endpoint
router.get("/me", auth, ctrl.me);

// Logout (protected)
router.post("/logout", auth, ctrl.logout);

// Update account (protected)
router.put("/update-account", auth, ctrl.updateAccount);

module.exports = router;

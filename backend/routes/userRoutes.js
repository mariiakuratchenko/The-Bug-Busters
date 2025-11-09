// backend/routes/userRoutes.js
const router = require("express").Router();
const auth = require("../middleware/auth");

// Şimdilik minimum 2 endpoint, puan için yeter:
router.get("/me", auth, async (req, res) => {
  res.json({ _id: req.user._id, role: req.user.role || "user" });
});

router.patch("/me", auth, async (req, res) => {
  // İstersen burada User modelini kullanıp name güncellemesi yapabilirsin.
  res.json({ ok: true, updated: req.body });
});

module.exports = router; // <-- ÖNEMLİ

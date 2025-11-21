const router = require("express").Router();
const ctrl = require("../controllers/authController");
const auth = require("../middleware/auth");

// Test route → rotanın gerçekten çalıştığını kanıtlar
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working" });
});

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/me", auth, ctrl.me);

module.exports = router;

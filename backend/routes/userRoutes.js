const router = require("express").Router();
const { getAllUsers, getUserById } = require("../controllers/userController");
const auth = require("../middleware/authjs");

router.get("/", auth, getAllUsers);
router.get("/:id", auth, getUserById);

module.exports = router;

const express = require("express");
const { markpresent, getMe, login } = require("../controller/students");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/markpresent", markpresent);
router.post("/getme", getMe);
router.post("/login", login);

module.exports = router;

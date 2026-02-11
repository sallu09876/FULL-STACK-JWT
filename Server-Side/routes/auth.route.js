const express = require("express");
const { createToken, verifyToken } = require("../controller/auth.controller");

const router = express.Router();

router.get("/create-token", createToken);
router.get("/verify-token", verifyToken);

module.exports = router;

const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const { voteIdea } = require("../controllers/voteController");

router.post("/:id", authMiddleware, voteIdea);

module.exports = router;

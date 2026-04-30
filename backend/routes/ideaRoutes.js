const express = require("express");
const router = express.Router();

const {
  createIdea,
  getIdeas,
  getTrendingIdeas,
} = require("../controllers/ideaController");

const authMiddleware = require("../middleware/authMiddleware");
const Idea = require("../models/Idea"); // 🔥 add this

// 🔐 Create idea (protected)
router.post("/", authMiddleware, createIdea);

// 🌍 All ideas
router.get("/", getIdeas);

// 🔥 Trending
router.get("/trending", getTrendingIdeas);

// 👤 My ideas (Dashboard)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user.id });
    res.json(ideas);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;

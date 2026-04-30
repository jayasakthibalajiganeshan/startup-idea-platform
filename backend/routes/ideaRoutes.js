const express = require("express");
const router = express.Router();

const {
  createIdea,
  getIdeas,
  getTrendingIdeas,
} = require("../controllers/ideaController");

const authMiddleware = require("../middleware/authMiddleware");
const Idea = require("../models/Idea");

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

// 🗑 Delete idea (owner only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json("Idea not found");
    }

    // Only post owner can delete
    if (idea.user.toString() !== req.user.id) {
      return res.status(401).json("Not authorized");
    }

    await idea.deleteOne();

    res.json("Idea deleted successfully");
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = router;

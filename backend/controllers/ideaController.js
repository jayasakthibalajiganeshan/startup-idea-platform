const Idea = require("../models/Idea");

// 🔐 Create Idea (WITH USER)
exports.createIdea = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const idea = await Idea.create({
      title,
      description,
      category,
      user: req.user.id, // 🔥 IMPORTANT
    });

    res.json(idea);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// 🌍 Get all ideas
exports.getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });

    res.json(ideas);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// 🔥 Trending ideas
exports.getTrendingIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ votes: -1 }).limit(10);

    res.json(ideas);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

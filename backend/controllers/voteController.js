const Vote = require("../models/Vote");
const Idea = require("../models/Idea");

exports.voteIdea = async (req, res) => {
  try {
    const ideaId = req.params.id;
    const userId = req.user.id; // 🔥 from token

    // 🔥 check if THIS USER already voted
    const existingVote = await Vote.findOne({
      idea: ideaId,
      user: userId,
    });

    if (existingVote) {
      return res.json("Already voted");
    }

    // 🔥 save vote with user
    await Vote.create({
      idea: ideaId,
      user: userId,
    });

    // 🔥 increase vote count
    await Idea.findByIdAndUpdate(ideaId, { $inc: { votes: 1 } }, { new: true });

    res.json("Vote added");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

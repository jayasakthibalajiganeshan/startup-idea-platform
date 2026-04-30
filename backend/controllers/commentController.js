const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  try {
    const { ideaId, comment } = req.body;

    const newComment = await Comment.create({
      idea: ideaId,
      comment,
    });

    res.json(newComment);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      idea: req.params.ideaId,
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  title: String,

  description: String,

  category: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  votes: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Idea", IdeaSchema);

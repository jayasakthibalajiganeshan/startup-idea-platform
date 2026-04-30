const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
connectDB();
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ideas", require("./routes/ideaRoutes"));
app.use("/api/vote", require("./routes/voteRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Startup Idea Platform API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

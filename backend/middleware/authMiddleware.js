const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔥 Check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("No token, access denied");
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message); // 🔥 debug

    res.status(401).json("Invalid or expired token");
  }
};

module.exports = authMiddleware;

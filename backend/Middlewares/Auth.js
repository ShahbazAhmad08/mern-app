const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.header("authorization");
  if (!auth) {
    return res.status(403).json({
      message: "unauthorized, JWT token is require",
    });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Unauthorized, JWT token is required",
    });
  }
};
module.exports = ensureAuthenticated;

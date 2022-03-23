const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRETORKEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Your are not authorized to access this route",
    });
  }
};

module.exports = auth;

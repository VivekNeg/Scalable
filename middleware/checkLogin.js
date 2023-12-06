const jwt = require("jsonwebtoken");

const checkLogin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).send("Unauthorized request");
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ status: 403, error: "Authentication failure" });
      }
      req.user = decoded;
      return next();
    });
  } catch (error) {
    res.status(403).json({ error: "Authentication failure", err: error });
    next("Authentication failure");
  }
};

module.exports = checkLogin;

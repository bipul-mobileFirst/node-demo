const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) res.status(403).json("token not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json("you are not allowed to do that");
  }
};

const verifyTokenAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json("you are not admin");
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
};

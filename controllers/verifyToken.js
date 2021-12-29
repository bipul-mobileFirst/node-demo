const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      console.log("jwt decode", user);
      if (err) res.status(403).json("token not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  console.log("user id", req.user.id);
  console.log("params id", req.params.id);
  if (req.user.isAdmin) {
    console.log("user matched", req.user.id);
    next();
  } else {
    res.status(403).json("you are not allowed to do that");
  }
};

const verifyTokenAdmin = (req, res, next) => {
  console.log("idhr aya", req.user);
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

const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkIfLoggedIn(req, res, next) {
  const token = req.headers.authorization.split(" ");
  const strategy = token[0];
  const tokenItself = token[1];

  if (strategy.toLowerCase() != "bearer") {
    res.status(400).send({
      message: "Strategy not bearer token",
    });
  } else if (!token) {
    res.status(400).send({
      message: "No token found",
    });
  } else {
    const userDetails = jwt.verify(tokenItself, process.env.AUTH_TOKEN);
    req.userDetails = userDetails;
    next();
  }
}

module.exports = checkIfLoggedIn;

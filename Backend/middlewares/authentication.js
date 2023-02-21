const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const Token = req.headers.authorization.split(" ").pop();
  const secret = "keySecret";
  jwt.verify(Token, secret, (err, result) => {
    if (err) {
      res.status(400);
      res.json("forbidden");
    } else {
      req.token = result;
      next();
    }
  });
};
module.exports = authentication;

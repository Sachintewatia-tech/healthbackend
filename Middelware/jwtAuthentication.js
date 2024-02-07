require('dotenv').config();
const jwt = require("jsonwebtoken");

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    let token = req.headers.authorization;
    // console.log('token',token);
    if (token) {
      token = token.split(" ")[1]
      jwt.verify(token, process.env.jwt, (err, user) => {
        if (err) {
          return res.status(403).json({"msg":"Not validate"});
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({"msg":"Not validate"});
    }
  };


  module.exports = {
    authenticateJWT
  }
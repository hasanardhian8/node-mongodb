const jwt = require("jsonwebtoken");
const User = require("../models/usersdb");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //cek jwt token exist and verified
  if (token) {
    jwt.verify(token, 'ardhian', (err, decodeToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/signin");
      } else {
        console.log(decodeToken);
        next();
      }
    });
  } else {
    res.redirect("/signin");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,'ardhian',
      async (err, decodeToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodeToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {requireAuth,checkUser}
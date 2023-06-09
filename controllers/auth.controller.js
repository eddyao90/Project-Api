const User = require('../models/User');
 const createError = require('http-errors');
 const { StatusCodes } = require('http-status-codes');
 const jwt = require('jsonwebtoken');

 module.exports.login = (req, res, next) => {
  const loginError = createError(StatusCodes.UNAUTHORIZED, 'Email or password incorrect');
  const { email, password } = req.body

  if (!email || !password) {
    return next(loginError);
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return next(loginError)
      }


      return user.checkPassword(password)
        .then(match => {
          if (!match) {
            return next(loginError)
          }

          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'test',
            {
              expiresIn: '7d'
            }
          )

          res.json({ accessToken: token })
        })
    })
    .catch(next)
}

module.exports.logout = (req, res, next) => {
  req.logout(() => res.redirect("/"));
};
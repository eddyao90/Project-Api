const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const isAuthenticaded = require('../middlewares/auth.middleware')

 //criando usuario
 module.exports.create = (req, res, next) => {
  const { email, password, firstName, lastName, username } = req.body;
  User.create({ email, password, firstName, lastName, username })
    .then(userCreated => {
      res.status(StatusCodes.CREATED).json(userCreated);
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next)
}

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}

module.exports.profile = (req, res, next) => {
  const { id } = req.user;

  Profile.findById(id)
  .then(profile => {
      res.render('user/profile')
  })
  .catch(err => next(err))
};


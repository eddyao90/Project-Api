const User = require('../models/User');
 const { StatusCodes } = require('http-status-codes');

 //criando usuario
 module.exports.create = (req, res, next) => {
   User.create(req.body)
     .then(createdUser => res.status(StatusCodes.CREATED).json(createdUser))
     .catch(next)
 }

 module.exports.list = (req, res, next) => {
   User.find()
     .then(users => res.status(StatusCodes.OK).json(users))
     .catch(next)
 }
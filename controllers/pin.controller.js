const Pin = require('../models/Pin');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');


  module.exports.create = (req, res, next) =>{
    const { user, title, descr, rating, long, lat } = req.body;
    Pin.create({ user, title, descr, rating, long, lat })
    .then(pinCreated => {
        res.status(StatusCodes.CREATED).json(pinCreated);
    })
    .catch(next)
  }

  module.exports.list = (req, res, next) => {
    Pin.find()
    .populate('user')
    .then(pin => res.json(pin))
    .catch(next)
  }
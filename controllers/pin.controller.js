const Pin = require('../models/Pin');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');


  module.exports.create = (req, res, next) =>{
    const { username, title, desc, rating, long, lat } = req.body;
    Pin.create({ username, title, desc, rating, long, lat })
    .then(pinCreated => {
        res.status(StatusCodes.CREATED).json(pinCreated);
    })
    .catch(next)
  }

  module.exports.list = (req, res, next) => {
    Pin.find()
    .then(pin => res.json(pin))
    .catch(next)
  }
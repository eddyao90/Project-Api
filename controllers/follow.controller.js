const User = require('../models/User');
const Follow = require('../models/Follow');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');

module.exports.doFollow = (req, res, next) => {
    const userToFollowId = req.params.id
    const { currentUserId } = req.body
    
    Follow.create({ follower: currentUserId, following: userToFollowId })
    .then((followCreated) => {
        res.status(StatusCodes.CREATED).json(followCreated);
    })
    .catch(next)
}

module.exports.getPeopleIFollow = (req, res, next) => {
    const { id } = req.params;
    
    Follow.find({ follower: id })
    .populate('following')
    .then((followList) => {
        res.status(StatusCodes.OK).json(followList);
    })
    .catch(next)
}

module.exports.getPeopleWhoFollows = (req, res, next) => {
    const { id } = req.params;
    
    Follow.find({ following: id })
    .populate('follower')
    .then((followerList) => {
        res.status(StatusCodes.OK).json(followerList);
    })
    .catch(next)
}
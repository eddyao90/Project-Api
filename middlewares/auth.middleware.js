const jwt = require('jsonwebtoken');
 const createError = require('http-errors');

 module.exports.isAuthenticaded = (req, res, next) => {
   const authorization = req.header('Authorization')

   if (!authorization) {
     return next(createError(401, 'No auth'));
   }

   const [type, token] = authorization.split(' ');

   if (type !== 'Bearer') {
     next(createError(401, 'Bearer error'));
   }

   if (!token) {
     next(createError(401, 'Token error'));
   }

   jwt.verify(token, process.env.JWT_SECRET || 'test', (err, decodedToken) => {
     if (err) {
       return next(err)
     } else {
      req.currentUserId = decodedToken.id
       next()
     }
   })
 }
const router = require('express').Router();
const usersController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const { isAuthenticaded } = require('../middlewares/auth.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

// test

router.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


// Auth

router.post('/login', authController.login);
router.post('/register', usersController.create)
router.get("/logout", authMiddleware.isAuthenticaded, authController.logout);

// Users

router.post('/users', usersController.create);
router.get('/users', usersController.list);
router.get('/users/me', authMiddleware.isAuthenticaded, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);

module.exports = router;
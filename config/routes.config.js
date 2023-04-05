const router = require('express').Router();
const usersController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const { isAuthenticaded } = require('../middlewares/auth.middleware');


// test

router.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


// Auth

router.post('/login', authController.login);
router.post('/register', usersController.create)

// Users

router.post('/users', usersController.create);
router.get('/users', isAuthenticaded, usersController.list);

module.exports = router;
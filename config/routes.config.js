const router = require('express').Router();
const usersController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const { isAuthenticaded } = require('../middlewares/auth.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const postsController = require('../controllers/posts.controller');
const pinController = require('../controllers/pin.controller');

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


// Pin

router.post('/map/pin', pinController.create);
router.get('/map/pin', pinController.list);

//Scrapbook

router.get('/posts', authMiddleware.isAuthenticaded, postsController.getPost);
router.post('/posts', authMiddleware.isAuthenticaded, postsController.createPost);
router.get('/posts/:id', authMiddleware.isAuthenticaded, postsController.getPost);
router.patch('/posts/:id', authMiddleware.isAuthenticaded, postsController.updatePost);
router.delete('/posts/:id', authMiddleware.isAuthenticaded, postsController.deletePost);


module.exports = router;
const router = require('express').Router();
const usersController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const { isAuthenticaded } = require('../middlewares/auth.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const pinController = require('../controllers/pin.controller');
const followController = require('../controllers/follow.controller');
const fileUploader = require('../config/cloudinary.config');
const commentController = require('../controllers/comment.controller');

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
router.get('/people/:id', usersController.listPeopleToFollow);
router.get('/users/me', authMiddleware.isAuthenticaded, usersController.getCurrentUser);
router.get('/users/:id', usersController.getUser);
router.post('/users/edit', fileUploader.single('image'), usersController.edit);

// Pin

router.post('/map/pin', pinController.create);
router.get('/map/pin', pinController.list);


//Follow
router.post('/follow/:id', authMiddleware.isAuthenticaded, followController.doFollow);
router.get('/follow/following/:id', authMiddleware.isAuthenticaded, followController.getPeopleIFollow);
router.get('/follow/followers/:id', authMiddleware.isAuthenticaded, followController.getPeopleWhoFollows);


//Comment
router.post("/scrapbook/comments", commentController.createComment);
router.get("/scrapbook/comments/:id", commentController.getComments);
router.delete("/scrapbook/comments/:id", commentController.deleteComment);

//Photos
//router.post('/community', authMiddleware.isAuthenticaded, fileUploader.single('image'), communityController.doCreate);


module.exports = router;
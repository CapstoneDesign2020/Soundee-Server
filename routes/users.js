var express = require('express');
var router = express.Router();
let User = require('../models/user');
const userController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');

// sign up
router.post('/signup',userController.signup)

// sign in 
router.get('/signin',userController.signin)

// withdraw
router.delete('/withdraw',AuthMiddleware.checkToken,userController.withdraw);
module.exports = router;

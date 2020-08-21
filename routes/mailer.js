var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middlewares/auth');

router.post('/emailAuth')
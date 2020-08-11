var express = require('express');
var router = express.Router();
const chartController = require('../controllers/chart');
const AuthMiddleware = require('../middlewares/auth');

module.exports = router;
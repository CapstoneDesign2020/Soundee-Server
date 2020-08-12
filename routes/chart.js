var express = require('express');
var router = express.Router();
const chartController = require('../controllers/chart');
const AuthMiddleware = require('../middlewares/auth');

// get chart data
router.get('/',AuthMiddleware.checkToken,chartController.getChart);
module.exports = router;
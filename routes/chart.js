var express = require('express');
var router = express.Router();
const chartController = require('../controllers/chart');
const AuthMiddleware = require('../middlewares/auth');

// get chart data
router.get('/daily',AuthMiddleware.checkToken,chartController.getDailyChart);
router.get('/weekly',AuthMiddleware.checkToken,chartController.getWeeklyChart);
router.get('/monthly',AuthMiddleware.checkToken,chartController.getMonthlyChart);

module.exports = router;
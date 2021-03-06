var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user',require('./users'));
router.use('/chart',require('./chart'));
router.use('/sound',require('./sound'));

module.exports = router;

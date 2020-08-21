var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middlewares/auth');
const soundController = require('../controllers/sound');

// 현재 들리는 소리 정보 요청
router.get('/',AuthMiddleware.checkToken,soundController.getCurrentSound);
// 현재 들리는 소리가 결과와 다를 때 chart 테이블에서 현재 소리 정보 삭제하기
// router.delete('/',AuthMiddleware.checkToken);
module.exports = router;
const jwt = require('../modules/jwt');
//const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey').secretKey;
const MSG = require('../modules/responseMessage');
const CODE = require('../modules/statusCode');
const util = require('../modules/util');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
        var token = req.cookies.accessToken; // 일단 post맨 테스트 용으로 쿠키에 저장해씀
        console.log(token)
        if (!token) {
            return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
        }
        const user = await jwt.verify(token,secretKey);
        if (user === TOKEN_EXPIRED) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
        }
        if (user === TOKEN_INVALID) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
        if (user.idx === undefined) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
        req.decoded = user;
        console.log("user",req.decoded.idx)
        next();
    }
}
module.exports = authUtil;
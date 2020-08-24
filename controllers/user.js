const User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const crypto = require('crypto');
const jwt = require('../modules/jwt');



const user ={
    signup: async(req,res)=>{
        //console.log("signup")
        const { email,  password, name} = req.body;
        
        // request data 확인, 없으면 Null value 반환
        if(!email || !password || !name){
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
          return;
        }
        try{
          // 사용 중인 아이디가 있는지 확인 
          const idx1 = await User.checkUser(email);
          if (idx1===true) {
              res.status(statusCode.BAD_REQUEST)
                  .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
              return;
          }
        
          const salt = crypto.randomBytes(32).toString('hex');
          
          // 회원가입
          const idx = await User.signup(email,password,salt,name);
          if(idx===-1){
            return res.status(statusCode.DB_ERROR)
                      .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
          }
          
          // 성공
          res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.CREATED_USER));
        }catch(error){
          return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
        }
        
    },
    signin: async(req, res)=>{
        // req 에서 데이터 가져오기
        const {email, password}=req.body;
        
        // req data 확인 , 없으면 null value 반환
        if(!email|| !password){
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
          return;
        }

        try{
          // 존재하는 id 인지 확인
          const user= await User.getUserByEmail(email);
          if(user.length==0){
            res.status(statusCode.BAD_REQUEST)
                    .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_ID_OR_PW));
                return;
          }
          // 비밀번호 확인
          const idx = await User.signin(email,password);
          if(idx===false){
            res.status(statusCode.BAD_REQUEST)
                    .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_ID_OR_PW));
                    return;
          }
          const {token, _}=await jwt.sign(user[0]);
        
          console.log(user)
          
          // 성공
          // 쿠키에 저장
          // res.cookie('accessToken',token,{
          //   expires: new Date(Date.now() + 604800000), // 유효기간 일주일..?
          //   secure: false, // set to true if your using https
          //   httpOnly: true,
          // });
          res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.LOGIN_SUCCESS,{
            accessToken : token
          }));
          //console.log(req.cookies.accessToken);
        }catch(error){
          return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
        }
    },
    withdraw: async (req,res)=>{
      try{
        const userIdx = req.decoded.idx;
        // console.log(userIdx)
        const result = await User.withdrawUser(userIdx);
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.WITHDRAW_USER));
      }catch(error){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
      }
    }
}
module.exports =user;
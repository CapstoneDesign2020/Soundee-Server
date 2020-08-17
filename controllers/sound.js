const Sound = require('../models/sound');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

const sound = {
    getCurrentSound : async(req,res)=>{
        try{
            const userIdx = req.decoded.idx;
            const result = await Sound.getCurrentSound(userIdx);
            console.log(result)
            res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_CURRENT_SOUND_SUCCESS,result));  
        }catch(error){
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
        }
    }
}
module.exports = sound;
const Sound = require('../models/sound');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

const sound = {
    getCurrentSound : async(req,res)=>{
        try{
            const userIdx = req.decoded.idx;
            const result = await Sound.getCurrentSound(userIdx);
            console.log(result.length)
            if(result.length===0){
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_CURRENT_SOUND));
                return;
            }
            res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_CURRENT_SOUND_SUCCESS,result));  
        }catch(error){
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
        }
    },
    deleteCurrentSound : async(req,res)=>{
        try{
            const {soundIdx} = req.params;
            console.log("soundIdz",soundIdx)
            // 존재하는 soundIdx인지 확인
            const sound = await Sound.searchSoundIdx(soundIdx);
            if(sound.length === 0){
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_SOUND_DATA));
                return;
            }
            const result = await Sound.deleteCurrentSound(soundIdx);
            res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_SOUND_DATA_SUCCESS,result));
        }catch(error){
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
        }
    } 
}
module.exports = sound;
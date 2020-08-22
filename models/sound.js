const pool = require('../modules/pool');
const table = 'sound';

const sound ={
    getCurrentSound : async(userIdx)=>{
        const query = `select * from ${table}
                        where sound_userIdx = ${userIdx}
                        and (eventdate between date_add(NOW(),INTERVAL -5 SECOND ) AND NOW());`
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            if (err.errno == 1062) {
                console.log('getCurrentSound ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getCurrentSound ERROR : ', err);
            throw err;
        }
    },
    searchSoundIdx : async(soundIdx)=>{
        const query = `select * from ${table} where soundIdx = ${soundIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            if (err.errno == 1062) {
                console.log('searchSoundIdx ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('searchSoundIdx ERROR : ', err);
            throw err;
        }
    },
    deleteCurrentSound : async(soundIdx)=>{
        const query = `delete from ${table} where soundIdx = ${soundIdx}`;
        try{
            const result = await pool.queryParam(query);
            console.log("delete",result);
            return result;
        }catch(err){
            if (err.errno == 1062) {
                console.log('deleteCurrentSound ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('deleteCurrentSound ERROR : ', err);
            throw err;
        }
    }
}

module.exports = sound;
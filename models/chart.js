const pool = require('../modules/pool');
const table = 'sound';

const chart = {
    getChart : async (userIdx)=>{
        const daily_query = `select class,date_format(eventdate,'%Y%m%d') as 'date',count(date_format(eventdate,'%Y%m%d')) as 'value' from ${table} where sound_userIdx = ${userIdx} and (eventdate between date_add(NOW(),INTERVAL -1 DAY ) AND NOW()) group by class;`;
        try{
            const result = await pool.queryParam(daily_query);
            console.log(result);
            return result;
        }catch(err){
            if (err.errno == 1062) {
                console.log('getChart ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getChart ERROR : ', err);
            throw err;
        }                    
    }
}
module.exports=chart;
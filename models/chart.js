const pool = require('../modules/pool');
const table = 'sound';

const chart = {
    getChart : async (userIdx)=>{
        const daily_query = `select class,date_format(eventdate,'%Y%m%d') as 'date',count('date') as 'value' 
                                from ${table} 
                                where sound_userIdx = ${userIdx} and (date_format(eventdate,'%Y%m%d') = date_format(NOW(),'%Y%m%d') ) 
                                group by class, date;`;
        const weekly_query = `select class,date_format(eventdate,'%Y%m%d') as 'date',count(date_format(eventdate,'%Y%m%d')) as 'value'
                                from ${table}
                                where sound_userIdx =${userIdx} and (eventdate between date_add(NOW(),INTERVAL -1 WEEK ) AND NOW())
                                group by class, date 
                                order by class, date asc;`;
        const monthly_query =`select class,date_format(eventdate,'%Y%m') as 'date',count(date_format(eventdate,'%Y%m')) as 'value'
                                from ${table}
                                where sound_userIdx =${userIdx} and (eventdate between date_add(NOW(),INTERVAL -1 year ) AND NOW())
                                group by class, date 
                                order by class, date asc;`
        try{
            let total_chart = new Object();

            const daily_result = await pool.queryParam(daily_query);
            const weekly_result = await pool.queryParam(weekly_query);
            const monthly_result = await pool.queryParam(monthly_query);

            total_chart.daily = daily_result;
            total_chart.weekly = weekly_result;
            total_chart.monthly = monthly_result;

            //console.log(total_chart.daily[0].class);
            return total_chart;
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
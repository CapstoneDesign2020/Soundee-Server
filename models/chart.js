const pool = require('../modules/pool');
const table = 'sound';

const chart = {
    getChart : async (userIdx)=>{
        const daily_query = `select class,date_format(eventdate,'%Y-%m-%d') as 'date',count('date') as 'value' 
                                from ${table} 
                                where sound_userIdx = ${userIdx} and (date_format(eventdate,'%Y%m%d') = date_format(NOW(),'%Y%m%d') ) 
                                group by class, date;`;
        const weekly_query = `select class,date_format(eventdate,'%Y-%m-%d') as 'date',count(date_format(eventdate,'%Y%m%d')) as 'value'
                                from ${table}
                                where sound_userIdx =${userIdx} and (eventdate between date_add(NOW(),INTERVAL -1 WEEK ) AND NOW())
                                group by class, date 
                                order by class, date asc;`;
        const monthly_query =`select class,date_format(eventdate,'%Y-%m') as 'date',count(date_format(eventdate,'%Y%m')) as 'value'
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

            return total_chart;
        }catch(err){
            if (err.errno == 1062) {
                console.log('getChart ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getChart ERROR : ', err);
            throw err;
        }                    
    },
    getDailyChart: async(userIdx)=>{
        const query = `select class,date_format(eventdate,'%Y-%m-%d') as 'date',count('date') as 'value' 
                        from ${table} 
                        where sound_userIdx = ${userIdx} and (date_format(eventdate,'%Y%m%d') = date_format(NOW(),'%Y%m%d') ) 
                        group by class, date;`;
        try{
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        }catch(err){
            if (err.errno == 1062) {
                console.log('getDailyChart ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getDailyChart ERROR : ', err);
            throw err;
        }
    },
    getWeeklyChart : async (userIdx)=>{
        const weekly_total_chart = new Array();
        let weekly_chart = new Object();
        const weekly_key_arr = ['sun','mon','tue','wed','thu','fri','sat'];
        let date = new Date();
        let day = date.getDay()+1;
        try{
            for(let i=1;i<=day;i++){
                //let key = weekly_key_arr[i];
                let soundSum_query = `select count(eventdate) as soundSum
                                        from ${table}
                                        where sound_userIdx = ${userIdx}
                                        and eventdate between date_add(NOW(),INTERVAL -1 WEEK ) AND NOW() 
                                        and dayofweek(eventdate) = ${i};`

                let query = `select coalesce(class,'sum') as class, date_format(eventdate,'%Y-%m-%d') as 'date',count(class) as 'value'
                                from ${table}
                                where sound_userIdx =${userIdx} 
                                and (date_format(eventdate,'%Y%m%d') = date_format(NOW(),'%Y%m%d')) 
                                and eventdate between date_add(NOW(),INTERVAL -1 WEEK ) AND NOW() 
                                and dayofweek(eventdate)= ${i}
                                group by date, class with rollup;`
                let details_query = `select class,date_format(eventdate,'%Y-%m-%d') as 'date',count(class) as 'value'
                                    from ${table}
                                    where sound_userIdx =${userIdx}
                                    and eventdate between date_add(NOW(),INTERVAL -1 WEEK ) AND NOW() 
                                    and dayofweek(eventdate)= ${i}
                                    group by class;`

                weekly_chart["day"] = weekly_key_arr[i-1];
                let temp = await pool.queryParam(soundSum_query);
                weekly_chart["soundSum"] = temp[0].soundSum;
                weekly_chart["details"] = await pool.queryParam(details_query);
                weekly_total_chart.push(weekly_chart);
                weekly_chart={}
            }
            return weekly_total_chart;
        }catch(err){
            if (err.errno == 1062) {
                console.log('getWeeklyChart ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getWeeklyChart ERROR : ', err);
            throw err;
        }
    },
    getMonthlyChart : async (userIdx)=>{
        const monthly_total_chart = new Array();
        let monthly_chart = new Object();
        const monthly_key_arr = [1,2,3,4,5,6,7,8,9,10,11,12];
        let date = new Date();
        let month = date.getMonth()+1;        
        try{
            for(let i=1;i<=month;i++){
                // let key = monthly_key_arr[i];
                let soundSum_query = `select count(eventdate) as soundSum
                                        from ${table}
                                        where sound_userIdx = ${userIdx}
                                        and eventdate between date_add(NOW(),INTERVAL -1 YEAR ) AND NOW() 
                                        and month(eventdate) = ${i};`
                let query = `select coalesce(class,'sum') as class,date_format(eventdate,'%Y-%m') as 'date',count(class) as 'value'
                                from ${table}
                                where sound_userIdx = ${userIdx}
                                and eventdate between date_add(NOW(),INTERVAL -1 YEAR ) AND NOW() 
                                and month(eventdate) = ${i+1}
                                group by date, class with rollup;`
                let details_query = `select class,date_format(eventdate,'%Y-%m') as 'date',count(class) as 'value'
                                        from ${table}
                                        where sound_userIdx = ${userIdx}
                                        and eventdate between date_add(NOW(),INTERVAL -1 YEAR ) AND NOW() 
                                        and month(eventdate)= ${i}
                                        group by class;`
                monthly_chart["month"] = monthly_key_arr[i-1];
                let temp = await pool.queryParam(soundSum_query);
                monthly_chart["soundSum"] = temp[0].soundSum;
                monthly_chart["details"] = await pool.queryParam(details_query);
                monthly_total_chart.push(monthly_chart);
                monthly_chart = {}
            }
            return monthly_total_chart;
        }catch(err){
            if (err.errno == 1062) {
                console.log('getMonthlyChart ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getMonthlyChart ERROR : ', err);
            throw err;
        }
    }
}
module.exports=chart;
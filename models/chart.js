const pool = require('../modules/pool');
const table = 'sound';


const chart = {
    getDailyChart: async(userIdx)=>{
        // const query = `select class,date_format(eventdate,'%Y-%m-%d') as 'date',count('date') as 'value' 
        //                 from ${table} 
        //                 where sound_userIdx = ${userIdx} and (date_format(eventdate,'%Y%m%d') = date_format(NOW(),'%Y%m%d') ) 
        //                 group by class, date;`;

        // date_format 을 NOW()로 바꾸기
        const query = `select class,date_format(eventdate,'%Y-%m-%d') as 'date' ,count(eventdate) as 'value' 
                        from (SELECT sound_class.class, date_format(eventdate,'%Y%m%d') as 'eventdate', b.sound_userIdx
                                FROM sound_class left OUTER JOIN (select * 
                                                                    from sound 
                                                                    where sound_userIdx = ${userIdx}
                                                                    and date_format(eventdate,'%Y%m%d') = date_format("2020-09-03 06:52:31",'%Y%m%d')) b
                                on sound_class.class = b.class ) a
                        group by a.class;`
        try{
            const result = await pool.queryParam(query);
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
        const weekly_arr = ['sun','mon','tue','wed','thu','fri','sat'];
        let date = new Date();
        let day = date.getDay()+1;
        day = 5; //발표를 위한 임시 방편...^^
        try{
            for(let i=1;i<=day;i++){
                // let soundSum_query = `select count(eventdate) as soundSum
                //                         from ${table}
                //                         where sound_userIdx = ${userIdx}
                //                         and eventdate between date_add(NOW(),INTERVAL -1 WEEK ) AND NOW() 
                //                         and dayofweek(eventdate) = ${i};`
                let soundSum_query = `select count(eventdate) as soundSum
                                        from ${table}
                                        where sound_userIdx = ${userIdx}
                                        and eventdate between date_add("2020-09-03 06:52:31",INTERVAL -1 WEEK ) AND "2020-09-03 06:52:31"
                                        and dayofweek(eventdate) = ${i};`
    
                // let details_query = `select class,date_format(eventdate,'%Y-%m-%d') as 'date',count(eventdate) as 'value'
                //                         from (SELECT sound_class.class, date_format(eventdate,'%Y%m%d') as 'eventdate', b.sound_userIdx
                //                                 FROM sound_class left OUTER JOIN (select * 
                //                                                                     from sound 
                //                                                                     where sound_userIdx =${userIdx}
                //                                                                     and eventdate between date_add(NOW(),INTERVAL -1 WEEK ) AND NOW() 
                //                                                                     and dayofweek(eventdate)= ${i}) b
                //                                 on sound_class.class = b.class ) a
                //                         group by class;`
                let details_query = `select class,date_format(eventdate,'%Y-%m-%d') as 'date',count(eventdate) as 'value'
                                        from (SELECT sound_class.class, date_format(eventdate,'%Y%m%d') as 'eventdate', b.sound_userIdx
                                                FROM sound_class left OUTER JOIN (select * 
                                                                                    from sound 
                                                                                    where sound_userIdx =${userIdx}
                                                                                    and eventdate between date_add("2020-09-03 06:52:31",INTERVAL -1 WEEK ) AND "2020-09-03 06:52:31" 
                                                                                    and dayofweek(eventdate)= ${i}) b
                                                on sound_class.class = b.class ) a
                                        group by class;`
                weekly_chart["day"] = weekly_arr[i-1];
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
        const monthly_arr = [1,2,3,4,5,6,7,8,9,10,11,12];
        let date = new Date();
        let month = date.getMonth()+1;        
        try{
            for(let i=1;i<=month;i++){
                // let soundSum_query = `select count(eventdate) as soundSum
                //                         from ${table}
                //                         where sound_userIdx = ${userIdx}
                //                         and eventdate between date_add(NOW(),INTERVAL -1 YEAR ) AND NOW() 
                //                         and month(eventdate) = ${i};`
                let soundSum_query = `select count(eventdate) as soundSum
                                        from ${table}
                                        where sound_userIdx = ${userIdx}
                                        and eventdate between date_add("2020-09-03 06:52:31",INTERVAL -1 YEAR ) AND "2020-09-03 06:52:31"
                                        and month(eventdate) = ${i};`
                // let details_query = `select class,date_format(eventdate,'%Y-%m') as 'date',count(eventdate) as 'value'
                //                         from (SELECT sound_class.class, date_format(eventdate,'%Y%m%d') as 'eventdate', b.sound_userIdx
                //                                 FROM sound_class left OUTER JOIN (select * 
                //                                                                     from sound 
                //                                                                     where sound_userIdx =${userIdx}
                //                                                                     and eventdate between date_add(NOW(),INTERVAL -1 YEAR ) AND NOW() 
                //                                                                     and month(eventdate)= ${i}) b
                //                                 on sound_class.class = b.class ) a
                //                         group by class;`
                let details_query = `select class,date_format(eventdate,'%Y-%m') as 'date',count(eventdate) as 'value'
                                        from (SELECT sound_class.class, date_format(eventdate,'%Y%m%d') as 'eventdate', b.sound_userIdx
                                                FROM sound_class left OUTER JOIN (select * 
                                                                                    from sound 
                                                                                    where sound_userIdx =${userIdx}
                                                                                    and eventdate between date_add("2020-09-03 06:52:31",INTERVAL -1 YEAR ) AND "2020-09-03 06:52:31"
                                                                                    and month(eventdate)= ${i}) b
                                                on sound_class.class = b.class ) a
                                        group by class;`
                monthly_chart["month"] = monthly_arr[i-1];
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
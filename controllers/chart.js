const Chart = require('../models/chart');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');


const chart ={
    getChart: async (req,res)=>{
        const userIdx = req.decoded.idx;
        console.log("idx",userIdx);
        const result = await Chart.getChart(userIdx)
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_CHART_SUCCESS,result));
        

    }
}

module.exports = chart;
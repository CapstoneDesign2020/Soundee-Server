const Chart = require('../models/chart');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');


const chart ={
    getDailyChart: async (req,res)=>{
        try{
            const userIdx = req.decoded.idx;
            const result = await Chart.getDailyChart(userIdx)
            res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_CHART_SUCCESS,result));
        }catch(error){
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
            // return response.respondOnError(error.message, res, statusCode.INTERNAL_SERVER_ERROR);
        }
    },
    getWeeklyChart: async (req,res)=>{
        try{
            const userIdx = req.decoded.idx;
            const result = await Chart.getWeeklyChart(userIdx)
            res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_CHART_SUCCESS,result));
        }catch(error){
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
            // return response.respondOnError(error.message, res, statusCode.INTERNAL_SERVER_ERROR);
        }
    },
    getMonthlyChart: async (req,res)=>{
        try{ 
            const userIdx = req.decoded.idx;
            const result = await Chart.getMonthlyChart(userIdx)
            res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.GET_CHART_SUCCESS,result));
        }catch(error){
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,resMessage.INTERNAL_SERVER_ERROR));
            // return response.respondOnError(error.message, res, statusCode.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = chart;
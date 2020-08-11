const pool = require('../modules/pool');
const table = 'user';
const crypto = require('crypto');
const { profile } = require('console');
const { queryParamArr } = require('../modules/pool');

const salt = crypto.randomBytes(32).toString('hex');

const user = { 
    signup: async(email,password,salt,name)=>{
        const fileds = 'email,password,salt,name';
        const questions='?,?,?,?';
        const hashed = crypto.pbkdf2Sync(password, salt.toString(), 1, 32, 'sha512').toString('hex');
        const values = [email,hashed,salt,name];
        const query= `insert into ${table}(${fileds}) values(${questions})`;
        try{
            const result=await pool.queryParamArr(query, values);
            const insertid=result.insertid;
            return insertid;
        }catch(err){
            if(err.errno == 1062){
                console.log("signup ERROR : ", err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ',err);
            throw err;
        }
    },
    checkUser : async (email)=>{
        const query = `SELECT * FROM ${table} where email="${email}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length==0){
                return false;
            }else return true;
        }catch(err){
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    signin:async (email, password)=>{
        const query = `SELECT * FROM ${table} where email="${email}"`;
        try{
            const result = await pool.queryParam(query);
            const hashed = crypto.pbkdf2Sync(password,result[0].salt.toString(),1,32,'sha512').toString('hex');

            if(result[0].password==hashed){
                return true;
            }else return false;
        }catch(err){
            if (err.errno == 1062) {
                console.log('signin ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signin ERROR : ', err);
            throw err;
        }
    },
    getUserByEmail: async (email)=>{
        const query=`select * from ${table} where email= "${email}"`;
        try{
            const result = await pool.queryParamArr(query);
            console.log(result)
            return result;
        }catch(err){
            if (err.errno == 1062) {
                console.log('getUserByEmail ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getUserByEmail ERROR : ', err);
            throw err;
        }
    },
    updateProfile:async(userIdx,profile)=>{
        let query =`UPDATE ${table} SET image="${profile}" WHERE userIdx="${userIdx}"`;
        try{
            await pool.queryParam(query);
            query = `SELECT id, name, email, image FROM ${table} WHERE userIdx="${userIdx}"`;
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('update profile ERROR :',err);
            throw err;
        }
    }
}
module.exports = user;
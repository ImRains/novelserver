/**
 * @description sequelize 实例
 */

 const Sequelize = require('sequelize')
 const { MYSQL_CONF } = require('../config/db')
 const {host,database,user,password} = MYSQL_CONF
 const { isProd, isTest } = require('../utils/env')
 
 const conf = {
     host : host,
     dialect : 'mysql'
 }
 
 if(isTest){
     conf.loggin = ()=>{
         // 如果测试环境下，禁止sequelize打印日志
     }
 }
 
 //线上环境，使用连接池
 if(isProd){
     conf.pool = {
         max : 5, //连接池最大的连接数量
         min : 0, //连接池最小的连接数量
         idle : 10*1000 //如果一个连接池10s之内没有被使用，则释放
     }
 }
 
 const seq = new Sequelize(database,user,password,conf)
 
 module.exports = seq
/**
 * @description 存储相关配置
 * @author Rain
 */

 const { isProd } = require('../utils/env')
 
 let MYSQL_CONF = {
     host : 'localhost',
     user : 'root',
     password : '',
     port : '3306',
     database : 'novelserver'
 }
 
 if(isProd){
     MYSQL_CONF = {
         host : '',
         user : 'root',
         password : '',
         port : '3306',
         database : 'novelserver'
     }
 }
 
 module.exports = {
     MYSQL_CONF
 }
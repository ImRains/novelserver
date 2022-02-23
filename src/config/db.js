/**
 * @description 存储相关配置
 * @author Rain
 */

 const { isProd } = require('../utils/env')
 
 let MYSQL_CONF = {
     host : 'localhost',
     user : 'root',
     password : '59484678',
     port : '3306',
     database : 'novelserver'
 }
 
 if(isProd){
     MYSQL_CONF = {
         host : '1.15.95.130',
         user : 'root',
         password : 'Mysql_59484678@',
         port : '3306',
         database : 'novelserver'
     }
 }

 let COMPUTE_CONF = {
     host:'http://localhost',
     port:'5566'
 }

 if(isProd){
    COMPUTE_CONF = {
        host:'http://1.15.95.130',
        port:'5566'
    }
}
 
 module.exports = {
     MYSQL_CONF,
     COMPUTE_CONF
 }
/**
 * @description 加密方法
 * crypto https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640
 */

 const crypto = require('crypto')
 // 引用密钥
 const { CRYPTO_SECRET_KEY } = require('../config/secretKeys')
 
 /**
  * MD5 加密
  * @param {*} content 明文 
  */
 function _md5(content){
     const md5 = crypto.createHash('md5')
     return md5.update(content).digest('hex') //'hex' 十六进制
 }
 
 /**
  * 加密方法
  * @param {*} content 明文
  */
 function doCrypto(content){
     const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
     return _md5(str)
 }
 
 module.exports = doCrypto
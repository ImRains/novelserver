/**
 * @description User模型
 */

 const { STRING, DECIMAL } = require('../type')
 const seq = require('../seq')
 
 // Users表
 const User = seq.define('user', {
     userName: {
         type: STRING,
         allowNull: false,
         unique: true,//唯一的
         comment:'用户名，唯一'
     },
     password: {
         type: STRING,
         allowNull:false,
         comment:'密码'
     },
     nickName: {
         type: STRING,
         allowNull:false,
         comment:'昵称'
     },
     gender: {
         type: STRING,
         allowNull:false,
         comment:'性别(1：男，2：女，3：保密，默认不传为保密)',
         defaultValue:'3'
     },
     picture: {
         type: STRING,
         comment: '图片地址，头像'
     },
     city: {
         type:STRING,
         comment: '城市'
     }
 })
 
 module.exports = User
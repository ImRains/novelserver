/**
 * @description 书籍收藏关系表
 */

 const { STRING, DECIMAL,INTEGER } = require('../type')
 const seq = require('../seq')

 const novelRelation = seq.define('novelRelation', {
     userId:{
         type: INTEGER,
         allowNull : false,
         comment:'用户ID'
     },
     novelId:{
         type:INTEGER,
         allowNull:false,
         comment:'被关注小说的id'
     }
 })

 module.exports = novelRelation
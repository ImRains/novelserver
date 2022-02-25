/**
 * @description 时间相关工具函数
 */

 const { format } = require('date-fns')

 /**
  * 格式化时间，例如 12.23 13:12
  * @param {string} str 时间字符串 
  * @returns 
  */
 function timeFormat(str){
     return format(new Date(str), 'MM.dd HH:mm')
 }
 
 module.exports = {
     timeFormat
 }
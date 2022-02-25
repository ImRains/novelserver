/**
 * @description 数据格式化
 */

 const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../../config/constant')
 const { timeFormat } = require('../../utils/dt')
 
 /**
  * 用户默认头像
  * @param {*} obj 
  */
 function _formatUserPicture(obj){
     if(obj.picture == null){
         obj.picture = DEFAULT_PICTURE
     }
     return obj
 }
 
 /**
  *  用户数据格式化
  * @param {*} list array of object
  */
 function formatUser(list){
     if(list == null){
         return list
     }
 
     if(list instanceof Array){
         return list.map(_formatUserPicture)
     }
 
     //单个对象
     return _formatUserPicture(list)
 }
 
 /**
  * 创建时间修改
  * @param {*} obj 
  */
  function _formatBlogDate(obj){
     obj.createdAtFormat = timeFormat(obj.createdAt)
     return obj
 }
 
 /**
  *  用户博客格式化
  * @param {*} list array of object
  */
 function formatBlog(list){
     if(list == null){
         return list
     }
 
     if(list instanceof Array){
         return list.map(_formatBlogDate).map(_formatContent)
     }
 
     let result = list
     result = _formatBlogDate(result)
     result = _formatContent(result)
 
     //单个对象
     return result
 }
 
 /**
  * 格式化博客内容
  * @param {*} obj 
  */
 function _formatContent(obj){
     obj.contentFormat = obj.content
     // 格式化@
     obj.contentFormat = obj.contentFormat.replace(
         REG_FOR_AT_WHO,
         (matchStr, nickName, userName) => {
             return `<a href="/profile/${userName}">@${nickName}</a>`
         }
     )
     return obj
 }
 
 module.exports = {
     formatUser,
     formatBlog
 }
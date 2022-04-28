/**
 * @description user services 数据处理格式化
 */

 const { User }  = require('../../db/model/index')
 const { formatUser } = require('./_format')
 const { COMPUTE_CONF } = require('../../config/db')
 
 /**
  * 获取用户信息
  * @param {*} userName 用户名
  * @param {*} password 密码
  */
 async function getUserInfo(userName, password) {
     // 查询条件
     const whereOpt = {
         userName
     }
     if (password) {
         Object.assign(whereOpt, { password })
     }
 
     //查询
     const result = await User.findOne({
         attributes:['id','userName','nickName','picture','city'],
         where:whereOpt
     })
     if(result == null){
         //未找到
         return result
     }
 
     // 格式化
     return formatUser(result.dataValues)
 }
 
 /**
  * 创建用户
  * @param {*} userName 用户名
  * @param {*} password 密码
  * @param {*} gender 性别 1：男 2：女 3：保密
  * @param {string} nickName 昵称
  */
 async function createUser({userName,password,gender=3,nickName}){
     const result = await User.create({
         userName,
         password,
         gender,
         nickName: nickName ? nickName : userName,
         picture: COMPUTE_CONF.host + ':' + COMPUTE_CONF.port + '/userImg/normal.jpg'
     })
 
     const data = result.dataValues
     return data
 }
 
 /**
  * 删除用户
  * @param {*} userName 
  */
 async function deleteUser(userName){
     const result = await User.destroy({
         where:{
             userName
         }
     })
     // result的值为删除的行数，大于0则删除成功
     return result>0
 }
 
 /**
  * 更新用户信息
  * @param {*} param0 要修改的内容
  * @param {*} param1 当前用户账号密码
  */
 async function updateUser({newPassword , newNickName,newPicture,newCity},{userName,password}){
     // 拼接修改内容
     const upData = {}
     if(newPassword){
         upData.password = newPassword
     }
     if(newNickName){
         upData.nickName = newNickName
     }
     if(newPicture){
         upData.picture = newPicture
     }
     if(newCity){
         upData.city = newCity
     }
     // 拼接查询条件
     const whereData = {
         userName
     }
     if(password){
         whereData.password = password
     }
     // 执行修改
     const result = await User.update(upData,{
         where:whereData
     })
     return result[0]>0//返回修改的行数，大于0则修改成功
 }
 
 module.exports = {
     getUserInfo,
     createUser,
     deleteUser,
     updateUser
 }
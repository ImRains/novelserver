/**
 * @description user controller
 */

 const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/db/user')
 const { addFollower, getFollowerList, deleteFollower } = require('../services/db/novel-relation')
 const { SuccessModel, ErrorModel } = require('../model/ResModel')
 const {
     registerUserNameNotExistInfo,
     registerUserNameExistInfo,
     registerFailInfo,
     loginFailInfo,
     deleteUserFailInfo,
     changeInfoFailInfo,
     changePasswordFailInfo,
     deleteFollowerFailInfo,
     addFollowerFailInfo
 } = require('../model/ErrorInfo')
 const doCrypto = require('../utils/cryp')
 const {  encryptJwt, decryptJwt } = require('../utils/jwt')
 
 /**
  * 用户名是否存在
  * @param {*} userName 用户名
  */
 async function isExist(userName) {
     //查询数据库，异步处理，调用services
     const userInfo = await getUserInfo(userName)
     if (userInfo) {
         //用户名存在
         return new SuccessModel(userInfo)
     } else {
         // 用户名不存在
         return new ErrorModel(registerUserNameNotExistInfo)
     }
 }

 /**
  * 通过 token 获取用户信息
  * @param {*} token 
  */
 async function getUserInfoByToken(token){
    let userInfo = decryptJwt(token)
    if(userInfo.token){
        // token true
        return new SuccessModel(userInfo.data)
    }else{
        return new ErrorModel(userInfo.data)
    }
 }
 
 /**
  * 注册
  * @param {*} userName 用户名
  * @param {*} password 密码
  * @param {*} gender 性别 1：男 2：女 3：保密
  */
 async function register({ userName, password, gender }) {
     const userInfo = await getUserInfo(userName)
     if (userInfo) {
         //用户名存在
         return new ErrorModel(registerUserNameExistInfo)
     }
 
     //用户名不存在，注册
     try {
         await createUser({ userName, password: doCrypto(password), gender })
         return new SuccessModel()
     } catch (error) {
         console.error(error.message, error.stack)
         return new ErrorModel(registerFailInfo)
     }
 }
 
 /**
  * 登陆
  * @param {*} param0 
  */
 async function login({ userName, password }) {
     // 登陆成功之后，ctx.session.userInfo
     const userInfo = await getUserInfo(userName, doCrypto(password))
     if (!userInfo) {
         //登陆失败
         return new ErrorModel(loginFailInfo)
     }
 
     //成功获取用户信息，下一步生成token
     let token = encryptJwt(userInfo,7)
     return new SuccessModel({userInfo,token})
 }
 
 /**
  * 删除当前用户
  * @param {*} userName 
  */
 async function deleteCurUser(userName) {
     // 调用service
     const result = await deleteUser(userName)
     if (result) {
         //删除成功
         return new SuccessModel()
     } else {
         //删除失败
         return new ErrorModel(deleteUserFailInfo)
     }
 }
 
 /**
  * 修改基本信息
  * @param {string} nickName 昵称
  * @param {string} city 城市
  * @param {string} picture 图片
  * @param {Object} ctx ctx
  */
 async function changeInfo({ token, nickName, city, picture }) {
     //修改完基本信息要修改session
     let userInfo = decryptJwt(token)
     const userName = userInfo.data.userName
     if (!nickName) {
         nickName = userName
     }
     // service
     const result = await updateUser({
         newNickName: nickName,
         newPicture: picture,
         newCity: city
     }, { userName })
     if (result) {
         //执行成功，修改session
         Object.assign(userInfo, {
             nickName,
             picture,
             city
         })
         let newToken = encryptJwt(userInfo, 7)
         return new SuccessModel({
             token:newToken
         })
     }
     // 失败 返回修改信息失败
     return new ErrorModel(changeInfoFailInfo)
 }
 
 /**
  * 修改密码
  * @param {*} param0 
  */
 async function changePassword({ token, password, newPassword }) {
     let userInfo = decryptJwt(token)
     const userName = userInfo.data.userName
     const result = await updateUser({
         newPassword: doCrypto(newPassword)
     }, {
         userName,
         password: doCrypto(password)
     })
     // 成功
     if (result) {
         return new SuccessModel()
     }
     // 失败
     return new ErrorModel(changePasswordFailInfo)
 }

 /**
  * 添加收藏
  */
 async function addNoverToFollow({token,novelId}){
    let userInfo = decryptJwt(token)
    try {
        let res = await addFollower({userId:userInfo.data.id,novelId})
        if(res.status){
            return new SuccessModel()
        }else{
            return new ErrorModel(addFollowerFailInfo)
        }
        
    } catch (error) {
        return new ErrorModel(addFollowerFailInfo)
    }
 }

 /**
  * 删除收藏
  */
  async function deleteNoverToFollow({token,novelId}){
    let userInfo = decryptJwt(token)
    try {
        let result = await deleteFollower({userId:userInfo.data.id,novelId})
        if(result){
            return new SuccessModel()
        }
        return new ErrorModel(deleteFollowerFailInfo)
    } catch (error) {
        return new ErrorModel(deleteFollowerFailInfo)
    }
 }

 /**
  * 获取收藏列表
  */
 async function getNovelFollowList(token){
    let userId = decryptJwt(token).data.id
    let { count, novelList } = await getFollowerList(userId)
    return new SuccessModel({
        count,
        novelList
    })
 }
 
 module.exports = {
     isExist,
     register,
     login,
     deleteCurUser,
     changeInfo,
     changePassword,
     addNoverToFollow,
     getNovelFollowList,
     deleteNoverToFollow,
     getUserInfoByToken
 }
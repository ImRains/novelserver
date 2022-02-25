/**
 * @description 验证登录的中间件
 */

 const { ErrorModel } = require('../model/ResModel')
 const { loginCheckFailInfo } = require('../model/ErrorInfo')
 
 /**
  * API 登录验证
  * @param {*} ctx 
  * @param {*} next 
  */
 async function loginCheck(ctx,next){
     if(ctx.session && ctx.session.userInfo){
         //已登录
         await next()
         return
     }else{
         //未登录
         ctx.body = new ErrorModel(loginCheckFailInfo)
     }
 }
 
 /**
  * 页面登录验证，如果没登录，跳转登录页面
  * @param {*} ctx 
  * @param {*} next 
  */
 async function loginRedirect(ctx,next){
     if(ctx.session && ctx.session.userInfo){
         //已登录
         await next()
         return
     }else{
         //未登录
         const ctxUrl = ctx.url
         ctx.redirect('/login?url='+encodeURIComponent(ctxUrl))
     }
 }
 
 module.exports = {
     loginCheck,
     loginRedirect
 }
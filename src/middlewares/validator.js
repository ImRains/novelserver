/**
 * @description josn schema 验证中间件
 */

 const { ErrorModel } = require('../model/ResModel')
 const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
 
 /**
  * 生成json schema的中间件
  * @param {*} userValidate 验证函数
  * @returns 
  */
 function genValidator(validateFn){
     async function validator(ctx,next){
         //校验
         const data = ctx.request.body
         const error = validateFn(data)
         if(error){
             ctx.body = new ErrorModel(jsonSchemaFileInfo)
             console.log(error)
             return
         }
         // 验证成功，继续
         await next()
     }
     return validator
 }
 
 module.exports = {
     genValidator
 }
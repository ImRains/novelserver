/**
 * @description json schema 校验
 */

 const AJV = require('ajv')

 const ajv = new AJV({
     //allErrors: true //输出所有的错误
 })
 
 /**
  * json schema 校验
  * @param {*} schema 
  * @param {*} data 
  */
 function validator(schema, data = {}){
     const valid = ajv.validate(schema,data)
     if(!valid){
         return ajv.errors[0]
     }
 }
 
 module.exports = validator
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/secretKeys')

/**
 * token 加密
 * @param {*} data 
 * @param {*} time 秒数
 */
function encryptJwt(data,days){
    return jwt.sign(data,JWT_SECRET_KEY,{expiresIn:days*24*60*60*1000})
}

/**
 * 校验 token
 * @param {*} token 
 * @returns 
 */
function decryptJwt(token){
    try {
        let data = jwt.verify(token,JWT_SECRET_KEY)
        return {
            token:true,
            data
        }
    } catch (error) {
        switch (error.name){
            case 'JsonWebTokenError':
                return {
                    token:false,
                    msg:'无效 token'
                }
            case 'TokenExpiredError':
                return {
                    token:false,
                    msg:'token 过期'
                }
        }
    }
}

module.exports = {
    encryptJwt,
    decryptJwt
}
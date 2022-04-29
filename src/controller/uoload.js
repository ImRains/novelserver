const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fsextra = require('fs-extra') //node fs plus
const path = require('path')
const MAX_SIZE = 5*1024 * 1024 * 1024 //文件最大体积是 5MB
const DIST_FOLDER_PATH = path.join(__dirname,'..','..','noverFiles/userImg')
const { COMPUTE_CONF } = require('../config/db.js')

// 判断目录是否存在，不存在则创建
fsextra.pathExists(DIST_FOLDER_PATH).then(exist => {
    if(!exist){
        fsextra.ensureDir(DIST_FOLDER_PATH)
    }
})

async function saveFile({name,type,size,filePath}){
    if(size > MAX_SIZE){
        //文件体积过大，先删除文件，再返回错误信息
        await fsextra.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 上传成功 移动文件
    const fileName = Date.now() + '.' + name // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH , fileName) //目的地
    await fsextra.move(filePath,distFilePath)

    // 返回信息
    return new SuccessModel({
        url: COMPUTE_CONF.host + ':' + COMPUTE_CONF.port + '/userImg/' + fileName
    })
}

module.exports = {
    saveFile
}
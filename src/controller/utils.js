/**
 * @description utile controller
 */

const path = require('path')
const download = require('download')
const { COMPUTE_CONF } = require('../config/db')

 const DIST_FOLDER_PATH = path.join(__dirname,'..','..','noverFiles/novelImg')
 
 async function downloadFile(url){
    let filename = Date.now() +'.'+ url.split('/').pop()
    await download(url,DIST_FOLDER_PATH,{
        filename
    })
     // 返回信息
     let baseurl = `${COMPUTE_CONF.host}:${COMPUTE_CONF.port}/novelImg/${filename}`
     return baseurl
 }
 
 module.exports = {
    downloadFile
 }
/**
 * @description utils api 路由
 */

 const router = require('koa-router')()
 const koaForm = require('formidable-upload-koa')
 const { saveFile } = require('../../controller/uoload')
 
 router.prefix('/api/utils')
 
 //上传图片
 router.post('/upload', koaForm(),async(ctx,next)=>{
    const file = ctx.req.files['file']
    if(!file){
        // 没有读取到file 404
        return
    }
    const { size, path, name, type} = file
    // controller
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath:path
    })
 })
 
 module.exports = router
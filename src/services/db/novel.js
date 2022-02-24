/**
 * @description 书籍基本信息server层
 */
const { Novel } = require('../../db/model/index')
const { getTimeStamp } = require('../../utils/time')

/**
 * 获取书籍信息
 * @param {*} title 
 */
async function getNovelInfoServer(title){
    const whereOpt = {
        title
    }
    const result = await Novel.findOne({
        attributes:['id','title','cover','date','desc','author','source','sourceUrl'],
        where:whereOpt
    })
    return result
}

/**
 * 通过书籍 id获取
 * @param {*} title 
 * @returns 
 */
async function getNovelInfoServerById(id){
    const whereOpt = {
        id
    }
    const result = await Novel.findOne({
        attributes:['id','title','cover','date','desc','author','source','sourceUrl'],
        where:whereOpt
    })
    return result
}

/**
 * 添加数据信息
 * @param {*} param0 
 * @returns 
 */
async function createNovelServer({title='无',cover='无',date='无',author='无',source='无',sourceUrl='无',desc='无'}){
    date = getTimeStamp()
    const result = await Novel.create({
        title,
        desc,
        cover,
        date,
        author,
        source,
        sourceUrl
    })
    const data = result.dataValues
    return data
}

/**
 * 更新书籍基本信息
 * @param {*} param0 
 * @param {*} param1 
 */
async function updateNovelInfoServer({newDate,newTitle,newDesc,newCover,newAuthor,newSource,newSourceUrl},{id}){
    const upData = {}
    if(newDate){
        upData.date = newDate
    }
    if(newTitle){
        upData.title = newTitle
    }
    if(newDesc){
        upData.desc = newDesc
    }
    if(newCover){
        upData.cover = newCover
    }
    if(newAuthor){
        upData.author = newAuthor
    }
    if(newSource){
        upData.source = newSource
    }
    if(newSourceUrl){
        upData.sourceUrl = newSourceUrl
    }
    const whereData = {
        id
    }
    // 执行修改
    const result = await Novel.update(upData,{
        where:whereData
    })
    return result[0] > 0 // 返回修改的行数，大于0则修改成功
}

module.exports = {
    getNovelInfoServer,
    getNovelInfoServerById,
    createNovelServer,
    updateNovelInfoServer
}
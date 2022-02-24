/**
 * @description 章节 基本信息
 */

const { NovelChapter } = require('../../db/model/index')

/**
 * 根据书籍id查询目录
 * @param {*} id 
 */
async function getNovelChapterServer(id){
    const whereOpt = {
        novelId:id
    }
    const result = await NovelChapter.findAndCountAll({
        attributes:['novelId','chaptername','source','chapterindex','sourceUrl'],
        order: [
            ['chapterindex', 'asc']
        ],
        where:whereOpt
    })
    return result
}

/**
 * 添加章节信息
 * @param {*} param0 
 */
async function addNovelChapterServer({chaptername=null,chaptercontent=null,chapterindex,novelId,source,sourceUrl}){
    const result = await NovelChapter.create({
        chaptername,
        chaptercontent,
        chapterindex,
        novelId,
        source,
        sourceUrl
    })
    const data = result.dataValues
    return data
}

/**
 * 获取单章节内容
 * @param {*} param0 
 */
async function getChapterContentServer({novelId,chapterindex}){
    const whereOpt = {
        novelId,
        chapterindex
    }
    const result = await NovelChapter.findOne({
        attributes:['id','chaptername','chaptercontent','source','sourceUrl'],
        where:whereOpt
    })
    return result
}

/**
 * 更新章节信息
 * @param {*} param0 
 * @param {*} param1 
 */
async function updateChapter({newChaptername,newChaptercontent,newSource,newSourceUrl},{novelId,chapterindex}){
    const upData = {}
    if(newChaptername){
        upData.chaptername = newChaptername
    }
    if(newChaptercontent){
        upData.chaptercontent = newChaptercontent
    }
    if(newSource){
        upData.source = newSource
    }
    if(newSourceUrl){
        upData.sourceUrl = newSourceUrl
    }
    const whereData = {
        chapterindex,
        novelId
    }
    // 执行修改
    const result = await NovelChapter.update(upData,{
        where:whereData
    })
    return result[0] > 0 // 返回修改的行数，大于0则修改成功
}

module.exports = {
    getNovelChapterServer,
    addNovelChapterServer,
    getChapterContentServer,
    updateChapter
}
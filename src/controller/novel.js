/**
 * @description novel controller
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { searchNovelError,novelSourceError } = require('../model/ErrorInfo')
const { sources } = require('../config/source')
const parser = require('../services/crawler/index')
const { getNovelInfoServer,createNovelServer,updateNovelInfoServer } = require('../services/db/novel')
const { getNovelChapterServer, addNovelChapterServer,getChapterContentServer,updateChapter } = require('../services/db/novel-chapter')
const { isToday, getTimeStamp } = require('../utils/time')
const { downloadFile } = require('./utils')

/**
 * 搜索书籍，获取书籍列表
 * @param {*} param0 
 * @returns 
 */
async function search({title,source}){
    if (!source) {
        return new ErrorModel(novelSourceError)
    } else {
        let strategy = sources[source].strategy
        let result = await parser().search(title, strategy)
        return new SuccessModel(result)
    }
}

/**
 * 获取书籍基本信息以及目录
 * @param {*} param0 
 */
async function getNovelInfo({title,sourceUrl,source}){
    let result = {}
    // 首先查看本地数据库，获取书籍基本信息
    let novelInfo = await getNovelInfoServer(title)
    let _strategy = sources[source].strategy
    // 如果没有查询到，说明数据库无本书籍信息，开始爬虫
    if(!novelInfo){
        let sourceNovelInfo = await parser().source(sourceUrl , _strategy.getNovelInfo, _strategy)
        let { cover,author,title,desc } = sourceNovelInfo
        // 下载图片
        cover = await downloadFile(cover)
        let _r = await createNovelServer({
            cover,
            author,
            title,
            desc,
            source,
            sourceUrl
        })
        novelInfo = _r
    }
    result.info = novelInfo
    // 获取书籍信息后开始查询目录列表
    let chapterList = await getNovelChapterServer(novelInfo.id)
    // 首次加载目录
    if(chapterList.count == 0){
        // 如果目录列表为空，说明未爬取章节信息
        let sourceNovelChapter = await parser().source(sourceUrl , _strategy.getChapter, _strategy)
        let _list = sourceNovelChapter.chapters
        // 目录存入数据库
        await Promise.all(_list.map(async (item,index) => {
            await addNovelChapterServer({
                chaptername:item.name,
                chapterindex:index,
                source:source,
                sourceUrl:item.url,
                novelId:novelInfo.id
            })
        }))
        let newDate = getTimeStamp()
        await updateNovelInfoServer({newDate},{id:novelInfo.id})
        chapterList = await getNovelChapterServer(novelInfo.id)
    }else{
        // 非首次加载，存在数据，需要判断目录信息是否为当日最新数据
        if(!isToday(novelInfo.date)){
            //不是当天更新的目录,需要爬取目录并进行对比
            // 爬取当天最新目录
            let sourceNovelChapter = await parser().source(sourceUrl , _strategy.getChapter, _strategy)
            let _list = sourceNovelChapter.chapters
            let _l = chapterList.rows.length - 1
            // 新的目录存入数据库
            await Promise.all(_list.map(async (item,index) => {
                if(index > _l){
                    await addNovelChapterServer({
                        chaptername:item.name,
                        chapterindex:index,
                        source:source,
                        sourceUrl:item.url,
                        novelId:novelInfo.id
                    })
                }
            }))
            chapterList = await getNovelChapterServer(novelInfo.id)
        }else{
            //当天更新的目录,无需操作
        }
    }

    result.chapters = chapterList
    return new SuccessModel(result)
}

/**
 * 获取章节内容
 */
async function getChapterContent({novelId,chapterindex}){
    // 首先调用数据库查询内容
    let chapter = await getChapterContentServer({novelId,chapterindex})
    if(!chapter.chaptercontent){
        // 数据库章节信息为空
        // 爬取
        let _strategy = sources[chapter.source].strategy
        let sourceChapter = await parser().chapterContent(chapter.sourceUrl, _strategy)
        // 更新数据库
        let newChaptercontent = sourceChapter.content
        await updateChapter({newChaptercontent},{chapterindex})
        chapter = await getChapterContentServer({novelId,chapterindex})
    }
    return new SuccessModel(chapter)
}

module.exports = {
    search,
    getNovelInfo,
    getChapterContent
}
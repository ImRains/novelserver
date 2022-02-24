/**
 * @description 图书相关 Apis
 */

const router = require('koa-router')()
const { search,getNovelInfo,getChapterContent,getNovelInfoById,getHotNovel } = require('../../controller/novel')

router.prefix('/api/novels')

// 搜索功能
router.get('/search', async (ctx, next) => {
    ctx.set('Content-type', 'application/json')
    let { source,title } = ctx.query
    ctx.body = await search({title,source})
})

// 通过书名获取书籍信息
router.get('/getNovelInfo', async (ctx, next) => {
    let { title,source,sourceUrl } = ctx.query
    ctx.body = await getNovelInfo({title,source,sourceUrl})
})

// 通过id获取书籍信息
router.get('/getNovelInfoById', async (ctx, next) => {
    let { bookid } = ctx.query
    ctx.body = await getNovelInfoById(bookid)
})

// 获取单章节详情
router.get('/chaptercontent', async (ctx, next) => {
    let { novelId, chapterindex } = ctx.query
    ctx.body = await getChapterContent({novelId,chapterindex})
})

// 获取热度排行
router.get('/getHotNovel', async (ctx, next) => {
    let { limit } = ctx.query
    ctx.body = await getHotNovel(Number(limit))
})

// 下载小说
// router.get('/download', async (ctx, next) => {
//     let { storyName, source, chapterUrl } = ctx.query
//     let Readable = require('stream').Readable;
//     let stream = new Readable();
//     stream._read = function noop() {}; // redundant? see update below
//     let content = await getParser().downloadStory(chapterUrl, sources[source].strategy)
//     let filename = storyName
//     filename = encodeURI(filename, "GBK")
//     filename = filename.toString('iso8859-1')
//     stream.push(content)
//     stream.push(null);
//     ctx.set('Content-disposition', 'attachment; filename=' + filename)
//     ctx.set('Content-type', 'application/force-download')
//     ctx.body = stream
// })

module.exports = router
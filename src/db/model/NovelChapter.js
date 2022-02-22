/**
 * @description 图书基本信息列表
 */

 const { STRING, INTEGER, TEXT } = require('../type')
 const seq = require('../seq')
 
 const NovelChapter = seq.define('novelchapter',{
     chaptername:{
         type:STRING,
         comment:'章节标题'
     },
     chaptercontent:{
         type:TEXT,
         comment:'章节内容'
     },
     chapterindex:{
         type:INTEGER,
         comment:'章节号'
     },
     novelId:{
         type:INTEGER,
         comment:'所属书籍id'
     },
     source:{
        type:STRING,
        comment:'数据源'
    },
    sourceUrl:{
        type:STRING,
        comment:'数据源地址'
    }
 })
 
 module.exports = NovelChapter
/**
 * @description 图书基本信息列表
 */

const { STRING, INTEGER, TEXT } = require('../type')
const seq = require('../seq')

const Novel = seq.define('novel',{
    title:{
        type:STRING,
        comment:'书名'
    },
    desc:{
        type:TEXT,
        comment:'简介'
    },
    cover:{
        type:STRING,
        comment:'封面'
    },
    date:{
        type:STRING,
        comment:'更新日期时间戳'
    },
    author:{
        type:STRING,
        comment:'作者'
    },
    hot:{
        type:INTEGER,
        comment:'热度'
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

module.exports = Novel
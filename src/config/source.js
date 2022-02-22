/**
 * @description 图书数据源
 */

const xbiqu = require('../services/crawler/source/xbiqu')
const sources = {
    xbiqu: {
        name: '新笔趣小说网',
        strategy: xbiqu,
        url: 'https://www.xbiquge.la/'
    }
}

module.exports =  {
    sources
}
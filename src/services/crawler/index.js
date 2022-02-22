/**
 * @description 爬虫工具代码
 */

const novelParser = require('./novel-parser')

function parser() {
    return new novelParser({
        step: 10
    })
}

module.exports = parser
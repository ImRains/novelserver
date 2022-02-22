/**
 * @description 数据模型入口
 */

const Novel = require('./Novel')
const NovelChapter = require('./NovelChapter')

// 创建外键
NovelChapter.belongsTo(Novel, {
    foreignKey: 'novelId'
})

module.exports = {
    Novel,
    NovelChapter
}
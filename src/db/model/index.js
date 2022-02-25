/**
 * @description 数据模型入口
 */

const Novel = require('./Novel')
const NovelChapter = require('./NovelChapter')
const User = require('./User')
const novelRelation = require('./NovelRelation')

// 创建外键
NovelChapter.belongsTo(Novel, {
    foreignKey: 'novelId'
})

novelRelation.belongsTo(Novel, {
    foreignKey: 'novelId'
})

User.hasMany(novelRelation, {
    foreignKey: 'userId'
})

module.exports = {
    Novel,
    NovelChapter,
    User,
    novelRelation
}
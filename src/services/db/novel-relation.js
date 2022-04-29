/**
 * @description 书籍 - 用户关系 server层
 */
 const { novelRelation,Novel } = require('../../db/model/index')

 /**
  * 添加收藏关系
  */
 async function addFollower({userId,novelId}){
    // 查看是否存在
    const isExist = await novelRelation.findAndCountAll({
        where:{
            userId,
            novelId
        }
    })
    if(isExist.count>0){
        // 存在 无法重复添加收藏
        return {
            status:false,
            msg:'请勿重复添加书架'
        }
    }else{
        const result = await novelRelation.create({
            userId,
            novelId
        })
        return {
            status:true,
            msg:'添加书架成功'
        }
    }
 }

 /**
  * 删除收藏关系
  * @param {*} param0 
  */
 async function deleteFollower({userId,novelId}){
    const result = await novelRelation.destroy({
        where:{
            userId,
            novelId
        }
    })
    return result>0
 }

 async function getFollowerList(userId){
    const result = await novelRelation.findAndCountAll({
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: Novel,
                attributes:['id','title','cover','date','author','hot','source','sourceUrl']
            }
        ],
        where:{
            userId
        }
    })

    // result.count 查询总数
    // result.rows 查询结果
    let novelList = result.rows.map(row => row.dataValues)


    novelList = novelList.map(item => {
        let novel = item.novel.dataValues
        return novel
    })
    return {
        count: result.count,
        novelList
    }
 }

 async function isCollectServer({userId,novelId}){
    const result = await novelRelation.findOne({
        include: [
            {
                model: Novel,
                attributes:['id','title','cover','date','author','hot','source','sourceUrl']
            }
        ],
        where:{
            userId,
            novelId
        }
    })
    if(result == null) return false
    return (result.dataValues.novelId == novelId && result.dataValues.userId == userId)
 }
 
 module.exports = {
    addFollower,
    getFollowerList,
    deleteFollower,
    isCollectServer
 }
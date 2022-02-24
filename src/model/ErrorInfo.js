/**
 * @description 失败信息集合
 */

 module.exports = {
    // 注册失败
    searchNovelError: {
        errno: 10001,
        message: '书籍搜索失败'
    },
    novelSourceError: {
        errno: 10002,
        message: '小说源设置错误'
    },
    downloadFileSizeFailInfo: {
        errno: 10003,
        message: '图片下载错误'
    },
    getNovelInfoError:{
        errno: 10004,
        message: '暂无该书籍'
    }
}
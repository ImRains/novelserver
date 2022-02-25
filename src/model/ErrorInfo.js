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
    },
    // 用户名不存在
    registerUserNameNotExistInfo: {
        errno: 10005,
        message: '用户名未存在'
    },
    registerUserNameExistInfo:{
        errno:10006,
        message:'用户名已存在'
    },
    // 注册失败
    registerFailInfo: {
        errno: 10007,
        message: '注册失败，请重试'
    },
     // 登录失败
     loginFailInfo: {
        errno: 10008,
        message: '登录失败，用户名或密码错误'
    },
    // 删除用户失败
    deleteUserFailInfo: {
        errno: 10009,
        message: '删除用户失败'
    },
    // 修改基本信息失败
    changeInfoFailInfo: {
        errno: 10010,
        message: '修改基本信息失败'
    },
    // 修改密码失败
    changePasswordFailInfo: {
        errno: 10011,
        message: '修改密码失败，请重试'
    },
    // 上传文件过大
    uploadFileSizeFailInfo:{
        errno: 10012,
        message: '上传文件尺寸过大'
    },
    loginCheckFailInfo: {
        errno: 10013,
        message: '您尚未登录'
    },
    addFollowerFailInfo: {
        errno: 10014,
        message: '添加收藏失败'
    },
    // 取消关注失败
    deleteFollowerFailInfo: {
        errno: 10015,
        message: '取消关注失败'
    }
}
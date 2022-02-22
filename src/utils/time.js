/**
 * @description 与时间相关的公共方法
 */

/**
 * 传入时间戳，判断是否为当天
 * @param {*} timepstamp 
 */
function isToday(timepstamp){
    return new Date(timepstamp * 1000).toDateString() === new Date().toDateString()
}

/**
 * 获取时间戳
 */
function getTimeStamp(){
    return Math.round(new Date() / 1000)
}

module.exports = {
    isToday,
    getTimeStamp
}
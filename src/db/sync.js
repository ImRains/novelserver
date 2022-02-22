/**
 * @description 同步js
 */

 const seq = require('./seq')

 require('./model/index')
 
 //测试连接
 seq.authenticate().then(() => {
     console.log('mysql auth ok')
 },() => {
     console.log('mysql auth err')
 })
 
 //执行同步
 seq.sync({ force: true }).then(() => {
     // force : 删除同名数据表后同步，谨慎使用，会导致数据丢失
     console.log('sync ok');
     process.exit(); // 程序退出
 })
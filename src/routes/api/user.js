const router = require('koa-router')()
const { isExist, register, login, deleteCurUser, changeInfo, changePassword,addNoverToFollow,getNovelFollowList,deleteNoverToFollow,getUserInfoByToken } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck, loginRedirect } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')

router.prefix('/api/user')

// 注册Api
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // 调用 controller
  let gender = 1
  ctx.body = await register({ userName, password, gender })
})

// 检测用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // 调用controller
  ctx.body = await isExist(userName)
})

// 通过token获取用户信息
router.get('/getUserInfo', async(ctx, nect) => {
  const token = ctx.header.authorization.split(' ')[1]
  ctx.body = await getUserInfoByToken(token)
})

// 登陆
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login({ userName, password })
})

// 删除
router.post('/delete', async (ctx, next) => {
  if (isTest) {
    //测试环境,才能删除已登录状态的自己
    const { userName } = ctx.session.userInfo
    //调用controller，删除
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改个人信息
router.patch('/changeInfo', genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  const token = ctx.header.authorization.split(' ')[1]
  // controller
  ctx.body = await changeInfo({ token, nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', genValidator(userValidate), async (ctx, body) => {
  const { password, newPassword } = ctx.request.body
  const token = ctx.header.authorization.split(' ')[1]
  //controller
  ctx.body = await changePassword({
    token,
    password,
    newPassword
  })
})

// 加入书架
router.post('/addNoverToFollow', async (ctx, next) => {
  const { novelId } = ctx.request.body
  // 调用 controller
  const token = ctx.header.authorization.split(' ')[1]
  ctx.body = await addNoverToFollow({token,novelId})
})

// 移除书架
router.post('/deleteNovelToFollow', async(ctx,next) => {
    const { novelId } = ctx.request.body
    const token = ctx.header.authorization.split(' ')[1]
    // controller
    ctx.body = await deleteNoverToFollow({token,novelId})
})

router.get('/getNovelFollowList',async(ctx,next) => {
  const token = ctx.header.authorization.split(' ')[1]
  ctx.body = await getNovelFollowList(token)
})

module.exports = router
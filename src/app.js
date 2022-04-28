const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')
const { JWT_SECRET_KEY } = require('./config/secretKeys')

// router
const index = require('./routes/index')
const novelApiRouter = require('./routes/api/novel')
const UserRouter = require('./routes/api/user')
const upLoadRouter = require('./routes/api/upload')
const cors = require('koa2-cors');
const koaStatic = require('koa-static')
const path = require('path')
const { isProd } = require('./utils/env')

// error handler
let onerrorConf = {}
if(isProd){
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app,onerrorConf)

// 跨域
app.use(
  cors({
      origin: function(ctx) { 
          return ctx.header.origin;
      },
      maxAge: 5, 
      credentials: true, 
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], 
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] 
  })
);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname , '..' , 'noverFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(async (ctx, next) => {
  // url，body 的 token
  let params = Object.assign({}, ctx.request.query, ctx.request.body);
  // 请求头的 token
  let token = ctx.request.header && ctx.request.header.authorization?ctx.request.header.authorization:(params.token?params.token:null)
   // cookie 的token
  if(!token) {
    token = ctx.cookies.get('token') || null;
  }
  // 设置头部
  ctx.request.header.authorization = "Bearer " + token
  await next();
})

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      // 自定义返回结果
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err;
    }
  })
})

app.use(jwtKoa({ secret: JWT_SECRET_KEY }).unless({
  path:[
    /^\/api\/novels/,
    /^\/api\/user\/login/,
    /^\/api\/user\/isExist/,
    /^\/api\/user\/register/,
    /^\/userImg/,
    /^\/novelImg/,
  ]
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(novelApiRouter.routes(), novelApiRouter.allowedMethods())
app.use(UserRouter.routes(),UserRouter.allowedMethods())
app.use(upLoadRouter.routes(),upLoadRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

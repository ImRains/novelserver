const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index = require('./routes/index')
const novelApiRouter = require('./routes/api/novel')
const cors = require('koa2-cors');
const koaStatic = require('koa-static')
const path = require('path')

// error handler
onerror(app)

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

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(novelApiRouter.routes(), novelApiRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

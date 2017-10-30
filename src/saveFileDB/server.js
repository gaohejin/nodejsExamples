const Koa = require('koa')
const http = require('http')
const convert = require('koa-convert')
const logger = require('koa-logger')
const cors = require('koa-cors') // 跨域
const koaBody = require('koa-body') // 请求体JSON解析
const onerror = require('koa-onerror') // 错误处理
const resource = require('koa-static') // 静态资源托管
const path = require('path')
const routes = require('./routes')
const config = require('./config/config')
const app = new Koa()
onerror(app)
app.use(convert(cors()))
app.use(convert(logger()))
app.use(koaBody({ multipart: true }))
app.use(resource(path.join(__dirname, '/'), {
  index: 'views/index.html',
  gzip: true
}))
// logger
app.use(async (ctx, next) => {
  try {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  } catch (error) {
    console.log(error)
  }
})

// routes
app.use(routes.routes(), routes.allowedMethods());
app.on('error', (error, ctx) => {
  console.log('错误' + JSON.stringify(ctx.onerror))
  console.log('server error:' + error)
})

http.createServer(app.callback()).listen(config.port).on('listening', function () {
  console.log('正在监听端口: http://localhost:' + config.port)
})

module.exports = app

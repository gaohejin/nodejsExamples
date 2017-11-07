const Koa = require('koa')
const http = require('http')
const convert = require('koa-convert')
const logger = require('koa-logger')
const cors = require('koa-cors') // 跨域
const onerror = require('koa-onerror') // 错误处理
const compose = require('koa-compose')
const config = require('./config/config')
const app = new Koa()
onerror(app)
app.use(convert(cors()))
app.use(convert(logger()))
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


const subdomain = composer(require('./routes/koa'))
function composer(app) {
  const middleware = app instanceof Koa ? app.middleware : app
  return compose(middleware)
}
app.use(async function(ctx, next) {
  switch (ctx.hostname) {
    case 'example.com':
    case 'www.example.com':
      return await subdomain.apply(this, [ctx, next])
  }
  return await next()
})

app.on('error', (error, ctx) => {
  console.log('错误' + JSON.stringify(ctx.onerror))
  console.log('server error:' + error)
})

http.createServer(app.callback()).listen(config.port).on('listening', function () {
  console.log('正在监听端口: http://localhost:' + config.port)
})

module.exports = app

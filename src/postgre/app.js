/**
 * Created by FDD on 2017/10/27.
 * @desc 连接postgre数据库
 */
const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa()
const index = require('./routes/index')
app.use(require('koa-static')(__dirname + '/view'))
app.use(logger())
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
app.use(index.routes(), index.allowedMethods())

// 启动端口
app.listen(4326, () => {
  console.log('The server is running at http://localhost:' + 4326)
})

module.exports = app

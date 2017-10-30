import Koa from 'koa'
import http from 'http'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors' // 跨域
import koaBody from 'koa-body' // 请求体JSON解析
import onerror from 'koa-onerror' // 错误处理
import resource from 'koa-static' // 静态资源托管
import path from 'path'
import routes from './routes'
import config from './config/config'

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

export default app

/**
 * Created by FDD on 2017/10/27.
 * @desc 文件上传读取
 */

const logger = require('koa-logger')
const serve = require('koa-static')
const koaBody = require('koa-body')
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const os = require('os')
const path = require('path')


app.use(logger());

app.use(koaBody({ multipart: true }));

// 错误处理
app.use(async function(ctx, next) {
  await next()
  if (ctx.body || !ctx.idempotent) return
  ctx.redirect('/404.html')
})

// 文件存储路径
app.use(serve(path.join(__dirname, '/view')));

app.use(async function(ctx, next) {
  // ignore non-POSTs
  if ('POST' !== ctx.method) return await next()
  const file = ctx.request.body.files.file
  const reader = fs.createReadStream(file.path)
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
  reader.pipe(stream)
  console.log('uploading %s -> %s', file.name, stream.path)
  ctx.redirect('/')
})

// 启动端口
app.listen(4326, () => {
  console.log('The server is running at http://localhost:' + 4326)
})

module.exports = app


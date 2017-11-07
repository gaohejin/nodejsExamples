const http = require('http')
const config = require('./config/config')
const fn = function (req, res) {
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Access-Control-Allow-Origin": "*",
    "Origin": "http://localhost:63342"
  });
  // 查询本机ip
  const sreq = http.request({
    host: 'buddebej.de', // 目标主机
    path: req.url, // 目标路径
    port: 80,
    // gzip: true,
    method: req.method // 请求方式
  }, function (sres) {
    sres.pipe(res);
    sres.on('end', function () {
      console.log('成功链接')
    });
  });
  if (/POST|PUT/i.test(req.method)) {
    req.pipe(sreq)
  } else {
    sreq.end()
  }
}

http.createServer(fn).listen(config.port).on('listening', function () {
  console.log('正在监听端口: http://localhost:' + config.port)
})

/**
 * Created by FDD on 2017/4/10.
 */
var http = require('http');
// 创建http服务
var app = http.createServer(function (req, res) {
  res.writeHead(200, {
    "Access-Control-Allow-Headers": "x-requested-with,content-type",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
    "Origin": "http://localhost:63342"
  });
  // 查询本机ip
  var sreq = http.request({
    host: '220.176.42.102', // 目标主机
    path: req.url, // 目标路径
    port: 8082,
    gzip: true,
    method: req.method // 请求方式
  }, function (sres) {
    console.log(req.url)
    sres.pipe(res);
    sres.on('end', function () {
      console.log('成功链接');
    });
  });
  if (/POST|PUT/i.test(req.method)) {
    req.pipe(sreq);
  } else {
    sreq.end();
  }
});
// 访问127.0.0.1:3001查看效果
app.listen(8082);
console.log('localProxy started on 127.0.0.1:8082');
var http = require('http');
// 创建http服务
var app = http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
  // 使用了superagent来发起请求
  var charset = require('superagent-charset');
  var superagent = require('superagent');
  charset(superagent);
  // 查询本机ip，这里需要根据实际情况选择get还是post
  var base = 'http://cn.bing.com';
  var url = base + req.url;
  var sreq = superagent.get(url);
  sreq.charset('utf-8');
  // JSON.stringify(res);
  sreq.pipe(res);
  sreq.on('end', function(){
  });
});
// 访问127.0.0.1:3002查看效果
app.listen(3002);
console.log('server started on 127.0.0.1:3002');
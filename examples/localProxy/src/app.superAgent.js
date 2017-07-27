/**
 * Created by FDD on 2017/4/10.
 */
var http = require('http');
// 创建http服务
var app = http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
  console.log(req.url)
  // 使用了superagent来发起请求
  var charset = require('superagent-charset');
  var superagent = require('superagent');
  charset(superagent);
  // 查询本机ip，这里需要根据实际情况选择get还是post
  var base = 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx={idx}&n=1&nc={nc}&pid=hp&video=1';
  var idx = parseInt(Math.random() * 10);
  var nc = (new Date()).getTime();
  var url = base.replace('{idx}', idx.toString()).replace('{nc}', nc.toString());
  var sreq = superagent.get(url);
  console.log(req.url);
  sreq.charset('utf-8');
  // JSON.stringify(res);
  sreq.pipe(res);
  sreq.on('end', function(){
    console.log('done');
  });
});
// 访问127.0.0.1:3002查看效果
app.listen(3002);
console.log('localProxy started on 127.0.0.1:3002');

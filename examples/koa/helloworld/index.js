/**
 * Created by FDD on 2017/7/27.
 */
const Koa = require('koa');
const app = module.exports = new Koa();
app.use(async function(ctx) {
  ctx.body = 'Hello World';
});
if (!module.parent) app.listen(3000);
console.log('started on http://127.0.0.1:3000');
const Koa = require('koa'); // Koa 为一个class
const Router = require('koa-router') // koa 路由中间件
const app = new Koa();
const router = new Router(); // 实例化路由
const conditional = require('koa-conditional-get'); //last-modified生效
const etag = require('koa-etag'); // etag
app.use(conditional());
app.use(etag());
const serve = require('koa-static');

app.use(serve(__dirname + "/static",
  { // 静态资源强缓存
    maxage: 10 * 1000
  }
))

// 添加url
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h5>Hello, world!</h5><img src="./img/no_cache.jpeg"><script src="./index.js"></script>`;
});

router.get('/index', async (ctx, next) => {
  ctx.response.body = '<h5>Index</h5>';
});

app.use(router.routes());

app.listen(3333, '0.0.0.0', () => {
  console.log('This server is running at http://localhost:' + 3333)
})
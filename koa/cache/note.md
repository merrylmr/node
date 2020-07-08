

## 强缓存 设置cache-control:"max-age:10"
设置`koa-static`插件即可。
```javascript
const serve = require('koa-static');
app.use(serve(__dirname + "/static",
  { // 静态资源强缓存
    maxage: 10 * 1000
  }
))
```
## 协商缓存
* Last-Modified+ If-Modified-Since
使用插件：`koa-conditional-get`
```javascript
const conditional = require('koa-conditional-get');
app.use(conditional());
```
* Etag+if-None-Match
使用插件`koa-etag`
```javascript
const etag = require('koa-etag');
app.use(etag());

```


注意点：
* 如果设置了强缓存和协商缓存，优先级：强缓存>协商缓存

* 静态资源（.css等）当未设置cache-control，响应头中有last-modified+etag,则是强缓存（disk-cache）

* 当直接冲浏览器打开资源（js等）不管有没有设置强缓存，都不会走强缓存，设置了协商缓存，则会走协商缓存。

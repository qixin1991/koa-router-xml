# koa-router-xml

koa-router@next xml parser middleware forked from `koa-xml`.

**Supported HTTP Methods**

- `POST`
- `PUT`
- `PATCH`
- `TRACE`

# Install

```
npm install koa-router-xml --save
```

# Usage

app.js
```
"use strict";
const Koa = require('koa'),
      app = new Koa(),
      xml = require('koa-router-xml'),
      userRouter = require('./routes/index.js');
 
app.use(xml());
 
app.use(userRouter.routes());
 
var port = 3000;
app.listen(port, function () {
  console.log(` ---> Server running on port: ${port}`);
});
```

routes/index.js
```
const router = require('koa-router')();

// convert xml to json
router.post('/', async ctx => {
    var data = await ctx.xml2json();
    ctx.body = data;
});

// convert json to xml
router.get('/xml-data', async ctx => {
  var obj = {name: "Super", Surname: "Man", age: 23};
  var xml = ctx.json2xml(obj);
  ctx.body = xml;
});

```
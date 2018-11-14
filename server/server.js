
// node还不支持import 只能require
const express = require('express');
const bodyParser = require('body-parser'); // 用来支持发送post请求
const cookieParser = require('cookie-parser'); // 缓存
const UserRouter = require('./user'); // 引入user.js
const app = express(); // 新建app

app.use(cookieParser());
app.use(bodyParser.json());  // 用来支持发送post请求

// .use是开启中间件
app.use('/user', UserRouter); // 把user抽离出去写

// app.get('/', function (req, res) {
//     res.send('<h1>hello world</h1>');
// });

app.listen(9093, function () {
    console.log("listening at 9093")
});

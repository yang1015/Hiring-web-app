// node还不支持import 只能require
const express = require('express');
const UserRouter = require('./user');
const app = express(); // 新建app
app.use('/user', UserRouter);

app.get('/', function (req, res) {
    res.send('<h1>hello world</h1>');
});

app.listen(9093, function () {
    console.log("listening at 9093")
});

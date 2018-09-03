// node还不支持import 只能require
const express = require('express');
const mongoose = require('mongoose');

// 链接mongoose
const DB_URL = 'mongodb://127.0.0.1:27017'; // /imooc要访问的地址
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log("MONGODB connected");
});

/* 表的概念 */
const User = mongoose.model('user', new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
}));

/* 增 */
// User.create({
//     user: 'tony',
//     age: 16
// }, function(err, doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err);
//     }
// });

/* 删 */
// User.remove({
//     age: 3
// }, function(err, doc) {
//     console.log(doc);
// });;

/* 改 */
User.update({
        'user': 'tony'
    }, {'$set': {age: 26}},
    function (err, doc) {
        console.log(doc);
    }
)

const app = express(); // 新建app
app.get('/', function (req, res) {
    res.send('<h1>hello world</h1>');
});

app.get('/data', function (req, res) {
    /* 查 返回json数据 */
    // {}为返回全部数据
    // {}里有内容 即为过滤条件 返回一个数组 里面是对象
    // User.findOne 只找到一个就返回 是对象
    User.find({
        'user': 'tony'
    }, function (err, doc) {
        res.json(doc);
    });
});
app.listen(9093, function () {
    console.log("listening at 9093")
});

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


const server = require('http').Server(app);
const io = require('socket.io')(server);
const model = require('./model');
const ChatModel = model.getModel('chat');

io.on('connection', function (socket) {
    /* on的对象不能是io io是全局性的，而Socket是当前的请求*/
    socket.on('sendmsg', function (data) {
        /* 全局广播当前sendmsg返回的data 所以使用的是io */
        // io.emit('receivemsg', data); // emit发送
        const {from, to, msgContent, createTime} = data;
        const chatId = [from, to].sort().join('_');
        ChatModel.create({chatId, from, to, msgContent, createTime}, function (err, doc) {
                if (err) console.log(err);
                else io.emit('receivemsg', Object.assign({}, doc._doc));
            }
        )
    });
});


// 原本是app.listen
server.listen(9093, function () {
    console.log("listening at 9093")
});

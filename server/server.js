// node还不支持import 只能require
const express = require('express');
const bodyParser = require('body-parser'); // 用来支持发送post请求
const cookieParser = require('cookie-parser'); // 存储登录信息cookie


/* 新建app */
const app = express();
/* use是开启中间件 */
app.use(cookieParser());
app.use(bodyParser.json());  // 用来支持发送post请求


/* 从外部引入UserRouter 并生成该类的实例 */
const UserRouter = require('./user');
/* use是开启中间件 把user抽离出去写*/
app.use('/user', UserRouter);

const server = require('http').Server(app);
const io = require('socket.io')(server);

/* 从外部引入model 并生成该类的实例 */
const model = require('./model');
const ChatModel = model.getModel('chat');

io.on('connection', function (socket) {
    /* on的对象不能是io io是全局性的，而socket是当前的请求*/
    socket.on('sendmsg', function (data) {
        /* 全局广播当前sendmsg返回的data 所以使用的是io */
        // io.emit('receivemsg', data); // emit发送
        const {from, to, msgContent, createTime} = data;
        const chatId = [from, to].sort().join('_');
        ChatModel.create({chatId, from, to, msgContent, createTime}, function (err, doc) {
                if (err) console.log(err);
                else io.emit('receivemsg', Object.assign({}, doc._doc));//Object.assign相当于...展开符号
            }
        )
    });
});


// 原本是app.listen
server.listen(9093, function () {
    console.log("listening at 9093")
});


// //使用node.js自带的path来解决相对路径的问题
// const path = require('path')
// //上线：
// //设置静态资源的地址，因为打包后的资源都在/build路径下，所以我们把/build设置成静态资源地址
// //把访问"/"这个路径开头的全部拦截下来，设置成静态资源地址，通过中间件的形式做一些转发
// app.use("/",express.static(path.resolve('build')))
// //使用中间件设置白名单
// app.use(function(req,res,next){
//     //如果是这两个路径前缀，就不是渲染文件相关的请求，直接next
//     if (req.url.startsWith('/user/')||req.url.startsWith('/static/')) {
//         return next
//     }
//     //反之，如果不是，就手动渲染index.html文件
//     return res.sendFile(path.resolve('build/index.html'))
// })


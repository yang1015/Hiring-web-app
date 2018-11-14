const express = require('express');
const UserRouter = express.Router();
const model = require('./model');
const UserModel = model.getModel('user');

const utils = require('utility'); // 支付md5的包
const _filter = {"pwd": 0, '__v': 0} // 隐藏掉pwd和数据库自带的__v 不显示

UserRouter.get('/list', function (req, res) {
    UserModel.find(
        {}, // 查询条件为空，即返回所有
        function (err, doc) {
            return res.json(doc);
        }
    )
});

UserRouter.get('/info', function (req, res) {
    const { userid } = req.cookies;
    if (!userid) return res.json({code: 1});

    UserModel.findOne({_id: userid}, _filter, function(err, doc){
        if (err) return res.json({code: 1, msg: "后端出错了"});
        if (doc) return res.json({code: 0, data: doc})
    })
});

/* post请求 */
UserRouter.post('/register', function (req, res) {
    /* req就是this.props.register()传入的那些user, pwd, type等参数 */
    const {user, pwd, type} = req.body; // 解构接口拿到的参数 相当于const user = req.body.user;

    /* 判断用户名是否存在 */
    UserModel.findOne(
        {user}, // 'user': user,
        function (err, doc) {
            /* 用户名已存在 */
            if (doc) { // 注意这里是判断doc是否存在，返回的doc就是被找到的那个重复的项
                return res.json({
                    code: 1,
                    msg: "用户名重复"
                });
            }

            const userModel = new UserModel({user, pwd: md5PwdWithString(pwd), type})
            userModel.save(function(err, doc) {
                if (err) {
                    return res.json({code: 1, msg: "后端报错"})
                }
                const {user, type, _id} = doc;
                res.cookie('userid', _id);
                return res.json({code: 0, data: {user, type, _id}}); //这里返回的对象就是user.redux.js那边要接收的res.data了
            });
        });
});

UserRouter.post('/login', function (req, res) {
    const {user, pwd} = req.body;
    UserModel.findOne(
        {user, pwd: md5PwdWithString(pwd)}, // 'user': user, 密码需要加密找
        _filter, // 这样接口处就隐藏了密码 不显示了。
        function (err, doc) {
            if (!doc) {
                return res.json({code: 1, msg: "用户名密码不存在或输入错误"});
            }
            /* 写入cookie */
            res.cookie("userid", doc._id); //数据库生成的唯一的id标识
            return res.json({code: 0, data: doc});
        });
});

UserRouter.get('/data', function (req, res) {
    return res.json({user: 'skye', age: 2})
});

function md5PwdWithString(pwd) {
    let string = 'Ollie-Skye-Twinkle-6666666-#@!$#@$!!@#!@';
    return utils.md5(pwd + string);
}

module.exports = UserRouter;
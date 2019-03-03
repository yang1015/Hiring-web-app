const express = require('express');

// 每个路由文件通过生成一个 express.Router实例router并导出，
// 通过 app.use挂载到不同的路径。
// 在实际开发中推荐使用express.Router将不同的路由分离到不同的路由文件中。
const UserRouter = express.Router();

const model = require('./model');
const UserModel = model.getModel('user');
const ChatModel = model.getModel('chat');

const utils = require('utility'); // 支持md5的包
const _filter = {"pwd": 0, '__v': 0} // 隐藏掉pwd和数据库自带的__v文档版本号 不显示

// 删除所有数据
// UserModel.remove({}, function (err, doc) {
//     console.log(doc);
// });
//
// ChatModel.remove({}, function (err, doc) {
//
// });

UserRouter.get('/list', function (req, res) {
    const {type} = req.query;
    let searchType;
    if (type == "boss") {
        searchType = "applicant";
    } else if (type == "applicant") {
        searchType = "boss";
    }


    UserModel.find(
        {type: searchType}, // 查询条件为空，即返回所有
        function (err, doc) {
            return res.json({code: 0, data: doc});
        }
    )
});

UserRouter.get('/info', function (req, res) {
    /* 取回cookies 看cookies中是否存有userid 如果有 那么0没问题 如果1那么未登录过要回到/login页面 */
    const {userid} = req.cookies;
    if (!userid) return res.json({code: 1}); // 0为真 1为假

    /* 找usermodel中_id这个属性值为cookie中值的那一组，如果找到了就返回data 找不到其实就是后端出错了 */
    UserModel.findOne({_id: userid}, _filter, function (err, doc) {
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
            // 之前用的是UserModel.create的方法来新建一个用户
            UserModel.create({user, pwd: md5PwdWithString(pwd), type}, _filter, function (err, doc) {
                if (err) {
                    return res.json({code: 1, msd: "后端报错"});
                }
                res.cookie('userid', doc._id);
                const _id = doc._id;
                // return null;
                return res.json({
                    code: 0,
                    data: {user, type, _id}
                    // data: doc filter隐藏的不是doc中的数据 好jb神奇
                });
            })
        });
});

UserRouter.post('/login', function (req, res) {

    // UserModel.find({}, function(err, doc) {console.log('6666   ', doc)})

    const {user, pwd} = req.body;
    UserModel.findOne(
        {user, pwd: md5PwdWithString(pwd)}, // 'user': user, 密码需要加密找
        _filter, // 接口返回的doc data里隐藏了密码 不显示了。
        function (err, doc) {
            if (!doc) {
                return res.json({code: 1, msg: "用户名密码不存在或输入错误"});
            }
            /* 写入cookie */
            res.cookie("userid", doc._id); //数据库生成的唯一的id标识
            /* 去掉返回数据中的pwd */
            // const { pwd, ...data } = doc;
            return res.json({code: 0, data: doc});
        });
});

UserRouter.get('/data', function (req, res) {
    return res.json({user: 'skye', age: 2})
});

UserRouter.post('/update', function (req, res) {
    /* 不需要判断update的是boss还是牛人 有唯一的标志_id */
    const dataToBeUpdated = req.body; // 存的Avatar是AvatarText
    const {userid} = req.cookies;

    if (!userid) return res.json({code: 1});

    UserModel.findByIdAndUpdate(userid, dataToBeUpdated, function (err, doc) {
        if (err) return res.json({code: 1, msg: "后端报错了"});
        // console.log(doc)
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, dataToBeUpdated);
        // console.log(dataToBeUpdated);

        return res.json({code: 0, data});
    });

    /* 不明白为啥以下代码不行 */
    // UserModel.findByIdAndUpdate(userid,
    //     {
    //         '$set': dataToBeUpdated
    //     }, {new: true}, function (err, doc) {
    //
    //         console.log(doc);
    //         return res.json({code: 0}, {data: doc});
    //     });
})

/* 消息列表相关接口 */
UserRouter.get('/getmsglist', function (req, res) {
    const userid = req.cookies.userid;
    // console.log(req.cookies)

    /* $or 查询多个条件*/
    // ChatModel.find({'$or': [{from: user, to: user}]}, function(err, doc) {
    //     return res.json({
    //         code: 0,
    //         data: []
    //     })
    // })
    ChatModel.find({}, function (err, doc) {
        if (!err) return res.json({code: 0, msgList: doc});
    })
});

UserRouter.post('/readmsg', function (req, res) {
    const {fromId} = req.body;
    const currentUserId = req.cookies.userid;
    // ChatModel.find({}, function (err, doc) {
    //     console.log(doc);
    // })
    ChatModel.update(
        {from: fromId, to: currentUserId, read: false},
        {'$set': {read: true}},
        {'multi': true},
        function (err, doc) {
            // console.log(doc); // n是数据量 nModified表示修改了多少条数据对多少数据生效了(set)
            if (!err) return res.json({code: 0, msgModifiedNum: doc.nModified});
            return res.json({code: 1});
        }
    )
    ;
});


/* md5加密 */
function md5PwdWithString(pwd) {
    let string = 'Ollie-Skye-Twinkle-6666666-#@!$#@$!!@#!@';
    return utils.md5(pwd + string);  // utils是支持md5的包
}

module.exports = UserRouter;
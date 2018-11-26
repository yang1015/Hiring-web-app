// 链接mongoose
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017'; // /imooc要访问的地址

mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log("MONGODB connected");
});

const models = {
    user: {
        'user': {
            type: String, require: true
        },
        'pwd': {
            type: String, require: true
        },
        'type': {
            type: String, require: true
        },
        'avatar': {
            type: String
        },
        'jobDesc': {
            type: String
        },
        'jobTitle': {
            type: String
        },
        'bossCompany': {
            type: String
        },
        'bossSalary': {
            type: String
        },

        "jobHunting": {
            type: String
        },
        "brief": {
            type: String
        },
        "applicantSalary": {
            type: String
        }
    },
    chat: {}
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name) //返回name对应的数据库
    }
}
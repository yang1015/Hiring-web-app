// 链接mongoose
const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017'; // /imooc要访问的地址

mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.log("MONGODB connected");
});



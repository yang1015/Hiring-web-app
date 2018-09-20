const express = require('express');
const UserRouter = express.Router();

UserRouter.get('/info', function(req, res) {
    return res.json({code: 1})
});

UserRouter.get('/data', function(req, res) {
    return res.json({user: 'skye', age: 2})
});

module.exports = UserRouter;
const express = require('express');
const Router = express.Router();

const model = require('./model');
const User = model.getModel('user');

Router.post('/register', (req, res)=>{
    const { user, pwd, type } = req.body;
    User.findOne({ user }, (err, doc) => {
        if (doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
    });
    User.create({ user, pwd, type }, (err, doc) => {
        if (err) {
            res.json({code:1, msg: '服务端错误'})
        }else{
            res.json({code:0})
        }
    })
})

Router.get('/list', (req, res) => {
    User.find({}, (err, doc)=>res.json(doc))
})

Router.get('/info', (req, res) => res.json({code: 1}))

module.exports = Router;
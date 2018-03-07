const express = require('express');
const Router = express.Router();

const utils = require('./util');
const model = require('./model');
const User = model.getModel('user');

// 过滤掉一些不想展示的字段
const _filter = {'pwd': 0, '__v': 0};

Router.post('/login', (req, res) => {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: utils.md5Pwd(pwd) }, _filter, (err, doc) => {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名不存在或者密码错误' })
        }
        res.cookie('userid', doc._id);
        return res.json({ code: 0, data: doc})
    })
})

Router.post('/register', (req, res)=>{
    const { user, pwd, type } = req.body;
    User.findOne({ user }, (err, doc) => {
        if (doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
    });
    User.create({ user, pwd: utils.md5Pwd(pwd), type }, (err, doc) => {
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

Router.get('/info', (req, res) => {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({ _id: userid }, _filter, (err, doc) =>{
        if (err) {
            return res.json({code: 1, msg: '服务端错误'})
        }else {
            return res.json({code: 0, data: doc})
        }
    })
})

module.exports = Router;
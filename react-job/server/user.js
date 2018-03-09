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

Router.post('/update', (req, res) => {
    const { userid } = req.cookies;
    // 更新时依然检测是否存在 cookie
    if (!userid) {
        return json.dumps({ code: 1 })
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, (err, doc) => {
       const { user, type } = doc;
       const data = Object.assign({}, { user, type }, body)
       return res.json({ code: 0, data })
    })
})


Router.post('/register', (req, res)=>{
    const { user, pwd, type } = req.body;
    User.findOne({ user }, (err, doc) => {
        if (doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
    });
    // 注册后, 将用户信息存入 redux state 中
    // create 方法无法获取 _id 信息, 换一种写法
    const userModel = new User({ user, pwd: utils.md5Pwd(pwd), type  });
    userModel.save((err, doc) => {
        if(err) {
            return res.json({ code: 1, msg: '服务端错误' })
        }
        const { user, type, _id } = doc;
        res.cookie('userid', _id);// 注册成功后, 写入 cookie 存储当前用户已登录状态
        return res.json({ code: 0, data: { user, type, _id } })
    })
})

Router.get('/list', (req, res) => {
    // User.remove({}, (err, doc) => {
    //     return res.json({ code: 0, msg: '删除成功' })
    // })
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
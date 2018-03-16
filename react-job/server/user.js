const express = require('express');
const Router = express.Router();

const utils = require('./util');
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');

// 过滤掉一些不想展示的字段
const _filter = {'pwd': 0, '__v': 0};

// 登录
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

// 获取当前用户的消息列表
Router.get('/msglist', (req, res) => {
    const userid = req.cookies.userid;// 当前登录用户
    let users = {};
    // 遍历出所有用户对应的用户名和头像
    // find 查找是一个异步操作, 这里要规避先后问题
    User.find({}, (err, doc) =>{
        if (!err) {
            doc.forEach(v=>{
                users[v._id] = { name: v.user, avatar: v.avatar }
            })
            // 查找与我有关的消息 '$or' 接收一个数组, 包含多个查询条件
            Chat.find({ '$or': [ {from: userid },{ to: userid } ] }, (err, doc) => {
                if (!err) {
                    return res.json({ code: 0, msgs: doc, users })
                }
            })
        }
    })
})

// 标记指定消息为已读
Router.post('/readmsg', (req, res) => {
    const { from } = req.body;// 消息发送方
    const to = req.cookies.userid;// 消息接收方
   Chat.update(
       { from, to }, // 更新条件
       {'$set': { read: true }}, // 修改属性
       {'multi': true },// 修改检索出的所有数据, 不加默认修改找到的第一条
       (err, doc) =>{
       if (!err) {
            //doc => { n: 3, nModified: 2, ok: 1 } 
            // n 满足条件多少条 nModified 影响多少条 ok操作成功
            return res.json({ code: 0 , num: doc.nModified })
       } else {
           return res.json({ code: 1, msg: '修改失败' })
       }
   })
})

// 获取当前登录用户信息
Router.post('/update', (req, res) => {
    const { userid } = req.cookies;
    // 更新时依然检测是否存在 cookie
    if (!userid) {
        return res.json({ code: 1, msg: '登录超时'})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, (err, doc) => {
       const { user, type } = doc;
       const data = Object.assign({}, { user, type }, body)
       return res.json({ code: 0, data })
    })
})

// 注册
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

// 获取用户列表, type: genius|boss
Router.get('/list', (req, res) => {
    // User.remove({}, (err, doc) => {
    //     return res.json({ code: 0, msg: '删除成功' })
    // })

    const { type } = req.query;
    User.find(type ? {type} : {}, _filter, (err, doc)=>res.json({ code: 0, data: doc }))
})

// 获取用户信息
Router.get('/info', (req, res) => {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({code: 1, msg: '登录超时'})
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
import path from 'path';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import socketio from 'socket.io';
import React from 'react';

import model from './model';
import userRouter from './user';

const Chat = model.getModel('chat');
const app = express();
const server = http.Server(app);
const io = socketio(server);

// io 是 socket.io 全局实例
io.on('connection', (socket)=>{
  // socket 当前连接实例
  socket.on('sendMsg', (data)=>{
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, (err, doc) =>{
        if (!err) {
            // 全局广播所有监听 receiveMsg 的实例，并且接受参数
            io.emit('receiveMsg', Object.assign({}, doc._doc));
        }
    })
  })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

// 路由拦截操作，用于服务端配置上线
app.use((req, res, next) => {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next();// 执行下一个中间件
  }
  return res.sendFile(path.resolve('build/index.html'));
})
app.use('/', express.static(path.resolve('build')));


server.listen(9093, () => {
  console.log('Server starting at http://localhost:9093/');
})
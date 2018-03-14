const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const model = require('./model');
const Chat = model.getModel('chat');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// io 是 socket.io 全局实例
io.on('connection', (curSocket)=>{
  // curSocket 当前连接实例
  curSocket.on('sendMsg', (data)=>{
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

const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, () => {
  console.log('Server starting at http://localhost:9093/');
})